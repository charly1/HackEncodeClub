function create_key_pair_with_adr_that_starts_with(start='0', n_max=10000) {
    if (!start.startsWith('0x'))
        start = '0x' + start;

    www = new Web3()

    k = www.eth.accounts.create();
    n=0;

    while (! k.address.toLocaleLowerCase().startsWith(start)){
        k = www.eth.accounts.create();
        n+=1;

        if ( n>n_max)
            return "n max reached";
    }

    return k;
}