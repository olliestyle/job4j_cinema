package ru.job4j.store;

import ru.job4j.model.Account;
import ru.job4j.model.Ticket;

import java.util.Collection;
import java.util.List;

public interface Store {
    boolean saveTicket(Ticket ticket);
    Account findAccountByEmail(String email);
    List<Ticket> findTicketsBySession(String session);
}
