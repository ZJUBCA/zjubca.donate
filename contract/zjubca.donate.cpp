#include "zjubca.donate.hpp"

void Donate::start()
{
    require_auth(_self);

    name recipient_account = name("donate");
    name foundation_account = name("zjubca");

    auto existing1 = recipient.find(recipient_account.value);
    auto existing2 = foundation.find(foundation_account.value);
    if (existing1 == recipient.end())
    {
        recipient.emplace(_self, [&](auto &new_recipient) {
            new_recipient.recipient_name = recipient_account;
            new_recipient.ZJUBCA_amount = asset(0, symbol("ZJUBCA", 4));
            new_recipient.EOS_amount = asset(0, symbol("EOS", 3));
        });
    }
    if (existing2 == foundation.end())
    {
        foundation.emplace(_self, [&](auto &new_foundation) {
            new_foundation.foundation_name = foundation_account;
            new_foundation.ZJUBCA_amount = asset(0, symbol("ZJUBCA", 4));
            new_foundation.EOS_amount = asset(0, symbol("EOS", 3));
        });
    }
}

void Donate::donatezjubca(name from, name to, asset quantity, string memo)
{
    if (memo == "donatezjubca")
    {
        eosio_assert(from != to, "cannot transfer to self");
        require_auth(from);
        eosio_assert(to == _self, "only can donate to the contract");

        auto sym = quantity.symbol;
        eosio_assert(sym.is_valid(), "invalid symbol name");
        eosio_assert(sym == symbol("ZJUBCA", 4), "invalid symbol name");

        eosio_assert(quantity.is_valid(), "invalid quantity");
        eosio_assert(quantity.amount > 0, "must transfer positive quantity");

        eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

        auto existing1 = donator.find(from.value);
        if (existing1 == donator.end())
        {
            donator.emplace(_self, [&](auto &new_donator) {
                new_donator.donator_name = from;
                new_donator.ZJUBCA_amount = quantity;
                symbol sym = symbol("EOS", 3);
                auto zero = asset(0, sym);
                new_donator.EOS_amount = zero;
            });
        }
        else
        {
            donator.modify(existing1, same_payer, [&](auto &content) {
                content.ZJUBCA_amount += quantity;
            });
        }

        auto existing2 = recipient.find(to.value);
        if (existing2 != recipient.end())
        {
            recipient.modify(existing2, same_payer, [&](auto &content) {
                content.ZJUBCA_amount += quantity;
            });
        }
    }
}

void Donate::donateeos(name from, name to, asset quantity, string memo)
{
    if (memo == "donateeos")
    {
        eosio_assert(from != to, "cannot transfer to self");
        require_auth(from);
        eosio_assert(to == _self, "only can donate to the contract");

        auto sym = quantity.symbol;
        eosio_assert(sym.is_valid(), "invalid symbol name");
        eosio_assert(sym == symbol("EOS", 3), "invalid symbol name");

        eosio_assert(quantity.is_valid(), "invalid quantity");
        eosio_assert(quantity.amount > 0, "must transfer positive quantity");

        eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

        auto existing1 = donator.find(from.value);
        if (existing1 == donator.end())
        {
            donator.emplace(_self, [&](auto &new_donator) {
                new_donator.donator_name = from;
                new_donator.EOS_amount = quantity;
                symbol sym = symbol("ZJUBCA", 4);
                auto zero = asset(0, sym);
                new_donator.ZJUBCA_amount = zero;
            });
        }
        else
        {
            donator.modify(existing1, same_payer, [&](auto &content) {
                content.EOS_amount += quantity;
            });
        }

        auto existing2 = recipient.find(to.value);
        if (existing2 != recipient.end())
        {
            recipient.modify(existing2, same_payer, [&](auto &content) {
                content.EOS_amount += quantity;
            });
        }
    }
}

void Donate::end()
{
    auto donator_begin_it = donator.begin();
    while (donator_begin_it != donator.end())
    {
        donator_begin_it = donator.erase(donator_begin_it);
    }

    auto recipient_begin_it = recipient.begin();
    while (recipient_begin_it != recipient.end())
    {
        recipient_begin_it = recipient.erase(recipient_begin_it);
    }

    auto foundation_begin_it = foundation.begin();
    while (foundation_begin_it != foundation.end())
    {
        foundation_begin_it = foundation.erase(foundation_begin_it);
    }
}

void Donate::sendtofound(name from, name to, string memo)
{
    eosio_assert(from != to, "cannot transfer to self");
    require_auth(from);
    eosio_assert(from == _self, "invalid transfer account");
    eosio_assert(to == name("zjubca"), "invalid transfer account");

    asset ZJUBCA_quantity = asset(MAX_ZJUBCA_QUANTITY, symbol("ZJUBCA", 4));
    asset EOS_quantity = asset(MAX_EOS_QUANTITY, symbol("EOS", 3));
    auto existing1 = recipient.find(from.value);
    if (existing1 != recipient.end())
    {
        const auto &st1 = *existing1;
        if (st1.ZJUBCA_amount >= ZJUBCA_quantity)
        {
            recipient.modify(st1, from, [&](auto &content) {
                content.ZJUBCA_amount -= ZJUBCA_quantity;
            });

            auto existing2 = foundation.find(to.value);
            if (existing2 != foundation.end())
            {
                const auto &st2 = *existing2;
                foundation.modify(st2, from, [&](auto &content) {
                    content.ZJUBCA_amount += ZJUBCA_quantity;
                });
            }
            action(
                permission_level{from, "active"_n},
                "zjubca.token"_n,
                "transfer"_n,
                std::make_tuple(from, to, ZJUBCA_quantity, memo))
                .send();
        }
        if (st1.EOS_amount >= EOS_quantity)
        {
            recipient.modify(st1, from, [&](auto &content) {
                content.EOS_amount -= EOS_quantity;
            });

            auto existing2 = foundation.find(to.value);
            if (existing2 != foundation.end())
            {
                const auto &st2 = *existing2;
                foundation.modify(st2, from, [&](auto &content) {
                    content.EOS_amount += EOS_quantity;
                });
            }
            action(
                permission_level{from, "active"_n},
                "eosio.token"_n,
                "transfer"_n,
                std::make_tuple(from, to, EOS_quantity, memo))
                .send();
        }
    }
}

// EOSIO_DISPATCH(Donate, (start)(donatezjubca)(donateeos)(sendtofound)(end))
extern "C"
{
    void apply(uint64_t receiver, uint64_t code, uint64_t action)
    {
        if (code == receiver && action != "transfer"_n.value)
        {
            switch (action)
            {
            case "start"_n.value:
                execute_action(name(receiver), name(code), &Donate::start);
                break;
            case "end"_n.value:
                execute_action(name(receiver), name(code), &Donate::end);
                break;
            case "sendtofound"_n.value:
                execute_action(name(receiver), name(code), &Donate::sendtofound);
                break;
            default:
                break;
            }
        }
        else if ((code == "zjubca.token"_n.value || code == "eosio.token"_n.value) && action == "transfer"_n.value)
        {
            switch (code)
            {
            case "zjubca.token"_n.value:
                execute_action(name(receiver), name(receiver), &Donate::donatezjubca);
                break;
            case "eosio.token"_n.value:
                execute_action(name(receiver), name(receiver), &Donate::donateeos);
                break;
            default:
                break;
            }
        }
    }
};