package ru.job4j.store;

import ru.job4j.model.Account;
import ru.job4j.model.Ticket;

import java.util.Collection;
import java.util.List;

public interface Store {
    boolean saveTicket(Ticket ticket);
    Account saveAccount(String email, String name, String phone);
    Account findAccount(String email, String name, String phone);
    List<Ticket> findTicketsBySession(String session);
}
