package ru.job4j.service;

import ru.job4j.model.Account;
import ru.job4j.store.PsqlStore;
import ru.job4j.store.Store;

public class AccountService {

    private final Store store = PsqlStore.instOf();

    public Account findAccountByEmail(String email) {
        return store.findAccountByEmail(email);
    }
}
