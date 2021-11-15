package ru.job4j.service;

import ru.job4j.model.Ticket;
import ru.job4j.store.PsqlStore;
import ru.job4j.store.Store;

import java.util.List;

public class BookingService {

    private final Store store = PsqlStore.instOf();

    public void bookTickets(List<Ticket> ticketsToBook) {
        for (Ticket ticket: ticketsToBook) {
            store.saveTicket(ticket);
        }
    }
}
