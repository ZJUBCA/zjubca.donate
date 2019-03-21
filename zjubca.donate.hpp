#pragma once

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/symbol.hpp>
#include <string>

#define MAX_ZJUBCA_QUANTITY 100000000
#define MAX_EOS_QUANTITY 1000000

using namespace eosio;
using namespace std;

namespace eosiosystem {
class system_contract;
}

class [[eosio::contract("zjubca.donate")]] Donate : public contract
{
private:
    // @abi table doantor
    struct [[eosio::table]] donator {
        name donator_name;
        asset ZJUBCA_amount;
        asset EOS_amount;

        auto primary_key() const {return donator_name.value;}
    };

    // @abi table recipient
    struct [[eosio::table]] recipient {
        name recipient_name;
        asset ZJUBCA_amount;
        asset EOS_amount;

        auto primary_key() const {return recipient_name.value;}
    };

    // @abi table foundation
    struct [[eosio::table]] foundation {
        name foundation_name;
        asset ZJUBCA_amount;
        asset EOS_amount;

        auto primary_key() const {return foundation_name.value;}
    };
    

    typedef multi_index<"donators"_n, donator> _donators;
    typedef multi_index<"recipients"_n, recipient> _recipients;
    typedef multi_index<"foundation"_n, foundation> _foundation;

    _donators donator;
    _recipients recipient;
    _foundation foundation;

public:
    using contract::contract;

    Donate(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds), 
        donator(receiver, code.value), recipient(receiver, code.value), foundation(receiver, code.value){}

    [[eosio::action]] void start();
    [[eosio::action]] void end();
    [[eosio::action]] void donatezjubca(name from, name to, asset quantity, string memo);
    [[eosio::action]] void donateeos(name from, name to, asset quantity, string memo);
    [[eosio::action]] void sendtofound(name from, name to, string memo);
};
