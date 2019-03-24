# zjubca.donate
An open, trusty and easy-to-use donate app based on EOSIO blockchain.

zjubca.denote旨在为协会搭建一个公开透明的捐赠平台。该应用主要有如下几个目的：

1. 回收Token。当有协会成员退出时，我们会鼓励其将已有的ZJUBCA和EOS捐赠给协会。已完成内部良好循环。
2. 建立组织文化和归属感。

## 需求分析
1. 用户可捐赠指定数量的ZJUBCA和EOS数量。先存入denote合约账户，在满足一定数量后自动转入协会基金账户。
2. 显示当前已收到捐赠的ZJUBCA和EOS总数。
3. 显示当前用户已捐赠的ZJUBCA数量和EOS数量。
4. 捐赠排行榜。对已进行捐赠的用户按捐赠数量进行排名。

注：ZJUBCA为协会Token的symbol，单独使用一个合约账户。

## 开发须知
- 请仔细阅读[dapp-dev-guide](https://github.com/Blockchain-zju/dapp-dev-guide)
- 移动端优先，使用场景主要是协会钱包。
