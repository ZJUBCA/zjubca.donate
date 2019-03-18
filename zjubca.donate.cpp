#include "zjubca.donate.hpp"

void Donate::start()
{
    require_auth(_self);

    name recipient_account = name("donate");
    name foundation_account = name("zjubca");

    _recipients recipient(_self, _self.value);
    _foundation foundation(_self, _self.value);
    auto existing1 = recipient.find(recipient_account.value);
    auto existing2 = foundation.find(foundation_account.value);
    if(existing1 == recipient.end())
    {
        recipient.emplace( _self, [&]( auto& new_recipient ) {
            new_recipient.recipient_name = recipient_account;
            new_recipient.ZJUBCA_amount = asset(0, symbol("ZJUBCA", 4));
            new_recipient.EOS_amount = asset(0, symbol("EOS", 3));
        });
    }
    if(existing2 == foundation.end())
    {
        foundation.emplace( _self, [&]( auto& new_foundation ){
            new_foundation.foundation_name = foundation_account;
            new_foundation.ZJUBCA_amount = asset(0, symbol("ZJUBCA", 4));
            new_foundation.EOS_amount = asset(0, symbol("EOS", 3));
        });
    }
}

void Donate::donatezjubca(name from, name to, asset quantity, string memo)
{
    eosio_assert(from != to, "cannot transfer to self");
    require_auth(from);
    eosio_assert(to == _self, "only can donate to the contract");

    auto sym = quantity.symbol;
    eosio_assert(sym.is_valid(), "invalid symbol name");
    eosio_assert(sym == symbol("ZJUBCA", 4), "invalid symbol name");
    //sym.print();

    eosio_assert(quantity.is_valid(), "invalid quantity");
    eosio_assert(quantity.amount > 0, "must transfer positive quantity");

    eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

    action(
        permission_level{from, "active"_n},
        "zjubca.token"_n,
        "transfer"_n,
        std::make_tuple(from, to, quantity, memo)
    ).send();

    _donators donator(_self, _self.value);
    auto existing1 = donator.find(from.value);
    if(existing1 == donator.end())
    {
        donator.emplace( _self, [&]( auto& new_donator ) {
            new_donator.donator_name = from;
            new_donator.ZJUBCA_amount = quantity;
            symbol sym = symbol("EOS", 3);
            auto zero = asset(0, sym);
            new_donator.EOS_amount = zero;
        });
    }
    else
    {
        const auto& st = *existing1;
        donator.modify(st, from, [&](auto &content){
            content.ZJUBCA_amount += quantity;
        });
    }

    _recipients recipient(_self, _self.value);
    auto existing2 = recipient.find(to.value);
    if(existing2 == recipient.end())
    {
        recipient.emplace( _self, [&]( auto& new_recipient ) {
            new_recipient.recipient_name = to;
            new_recipient.ZJUBCA_amount = quantity;
            symbol sym = symbol("EOS", 3);
            auto zero = asset(0, sym);
            new_recipient.EOS_amount = zero;
        });
    }
    else
    {
        const auto& st = *existing2;
        recipient.modify(st, from, [&](auto &content){
            content.ZJUBCA_amount += quantity;
        });
    }
}

void Donate::donateeos(name from, name to, asset quantity, string memo)
{
    eosio_assert(from != to, "cannot transfer to self");
    require_auth(from);
    eosio_assert(to == _self, "only can donate to the contract");

    auto sym = quantity.symbol;
    eosio_assert(sym.is_valid(), "invalid symbol name");
    eosio_assert(sym == symbol("EOS", 3), "invalid symbol name");
    // sym.print();

    eosio_assert(quantity.is_valid(), "invalid quantity");
    eosio_assert(quantity.amount > 0, "must transfer positive quantity");

    eosio_assert(memo.size() <= 256, "memo has more than 256 bytes");

    action(
        permission_level{from, "active"_n},
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(from, to, quantity, memo)
    ).send();

    _donators donator(_self, _self.value);
    auto existing1 = donator.find(from.value);
    if(existing1 == donator.end())
    {
        donator.emplace( _self, [&]( auto& new_donator ) {
            new_donator.donator_name = from;
            new_donator.EOS_amount = quantity;
            symbol sym = symbol("ZJUBCA", 4);
            auto zero = asset(0, sym);
            new_donator.ZJUBCA_amount = zero;
        });
    }
    else
    {
        const auto& st = *existing1;
        donator.modify(st, from, [&](auto &content){
            content.EOS_amount += quantity;
        });
    }

    _recipients recipient(_self, _self.value);
    auto existing2 = recipient.find(to.value);
    if(existing2 == recipient.end())
    {
        recipient.emplace( _self, [&]( auto& new_recipient ) {
            new_recipient.recipient_name = to;
            new_recipient.EOS_amount = quantity;
            symbol sym = symbol("ZJUBCA", 4);
            auto zero = asset(0, sym);
            new_recipient.ZJUBCA_amount = zero;
        });
    }
    else
    {
        const auto& st = *existing2;
        recipient.modify(st, from, [&](auto &content){
            content.EOS_amount += quantity;
        });
    }
}

void Donate::end()
{
    _donators donator(_self, _self.value);
    auto donator_begin_it = donator.begin();
    while (donator_begin_it != donator.end())
    {
        donator_begin_it = donator.erase(donator_begin_it);
    }

    _recipients recipient(_self, _self.value);
    auto recipient_begin_it = recipient.begin();
    while(recipient_begin_it != recipient.end())
    {
        recipient_begin_it = recipient.erase(recipient_begin_it);
    }

    _foundation foundation(_self, _self.value);
    auto foundation_begin_it = foundation.begin();
    while(foundation_begin_it != foundation.end())
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

    _recipients recipient(_self, _self.value);
    _foundation foundation(_self, _self.value);
    asset ZJUBCA_quantity = asset(MAX_ZJUBCA_QUANTITY, symbol("ZJUBCA", 4));
    asset EOS_quantity = asset(MAX_EOS_QUANTITY, symbol("EOS", 3));
    auto existing1 = recipient.find(from.value);
    if(existing1 != recipient.end())
    {
        const auto& st1 = *existing1;
        if(st1.ZJUBCA_amount >= ZJUBCA_quantity)
        {
            recipient.modify(st1, from, [&](auto &content){
                content.ZJUBCA_amount -= ZJUBCA_quantity;
            });

            auto existing2 = foundation.find(to.value);
            if(existing2 != foundation.end())
            {
                const auto& st2 = *existing2;
                foundation.modify(st2, from, [&](auto &content){
                    content.ZJUBCA_amount += ZJUBCA_quantity;
                });
            }
            action(
                permission_level{from, "active"_n},
                "zjubca.token"_n,
                "transfer"_n,
                std::make_tuple(from, to, ZJUBCA_quantity, memo)
            ).send();
        }
        if(st1.EOS_amount >= EOS_quantity)
        {
            recipient.modify(st1, from, [&](auto &content){
                content.EOS_amount -= EOS_quantity;
            });

            auto existing2 = foundation.find(to.value);
            if(existing2 != foundation.end())
            {
                const auto& st2 = *existing2;
                foundation.modify(st2, from, [&](auto &content){
                    content.EOS_amount += EOS_quantity;
                });
            }
            action(
                permission_level{from, "active"_n},
                "eosio.token"_n,
                "transfer"_n,
                std::make_tuple(from, to, EOS_quantity, memo)
            ).send();
        }
     }
}

EOSIO_DISPATCH(Donate, (start)(donatezjubca)(donateeos)(sendtofound)(end))