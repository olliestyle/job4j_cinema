package ru.job4j.store;

import ru.job4j.model.Account;
import ru.job4j.model.Ticket;

import java.util.Collection;

public interface Store {
    boolean saveTicket(Ticket ticket);
    Account findAccountByEmail(String email);
}
