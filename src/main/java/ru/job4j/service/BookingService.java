package ru.job4j.service;

import ru.job4j.model.Ticket;
import ru.job4j.store.PsqlStore;
import ru.job4j.store.Store;

import java.util.List;

public class BookingService {

    private final Store store = PsqlStore.instOf();

    private BookingService() {

    }

    private static final class Lazy {
        private static final BookingService INST = new BookingService();
    }

    public static BookingService instOf() {
        return Lazy.INST;
    }

    public void bookTickets(List<Ticket> ticketsToBook) {
        for (Ticket ticket: ticketsToBook) {
            store.saveTicket(ticket);
        }
    }

    public List<Ticket> findBookedTicketsBySession(String session) {
        return store.findTicketsBySession(session);
    }
}
