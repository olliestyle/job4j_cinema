package ru.job4j.controller;

import ru.job4j.model.Account;
import ru.job4j.model.Ticket;
import ru.job4j.service.AccountService;
import ru.job4j.service.BookingService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class HallServlet extends HttpServlet {

    private final BookingService bookingService = new BookingService();
    private final AccountService accountService = new AccountService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("index.html").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        String cells = req.getParameter("cells");
        String session = req.getParameter("session");
        String email = req.getParameter("userEmail");
        Account account = accountService.findAccountByEmail(email);
        String[] toParse = cells.split(",");
        List<Ticket> ticketsToBook = new ArrayList<>();
        for (String str: toParse) {
            int row = Integer.parseInt(str.substring(str.indexOf("row") + 3, str.indexOf("place")));
            int place = Integer.parseInt(str.substring(str.indexOf("place") + 5, str.indexOf("price")));
            Ticket ticket = new Ticket(row, place, Integer.parseInt(session), account.getId());
            ticketsToBook.add(ticket);
        }
        bookingService.bookTickets(ticketsToBook);
    }
}
