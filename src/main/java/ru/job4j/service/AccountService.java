package ru.job4j.service;

import ru.job4j.model.Account;
import ru.job4j.store.PsqlStore;
import ru.job4j.store.Store;

public class AccountService {

    private final Store store = PsqlStore.instOf();

    private AccountService() {

    }

    private static final class Lazy {
        private static final AccountService INST = new AccountService();
    }

    public static AccountService instOf() {
        return AccountService.Lazy.INST;
    }

    public Account findAccount(String email, String name, String phone) {
        return store.findAccount(email, name, phone);
    }
}
