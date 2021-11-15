package ru.job4j.store;

import org.apache.commons.dbcp2.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.job4j.model.Account;
import ru.job4j.model.Ticket;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class PsqlStore implements Store {

    private final BasicDataSource pool = new BasicDataSource();
    private static final Logger LOG = LoggerFactory.getLogger(PsqlStore.class.getName());

    private PsqlStore() {
        Properties cfg = new Properties();
        try (BufferedReader io = new BufferedReader(
                new FileReader("cinemadb.properties")
        )) {
            cfg.load(io);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
        try {
            Class.forName(cfg.getProperty("jdbc.driver"));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
        pool.setDriverClassName(cfg.getProperty("jdbc.driver"));
        pool.setUrl(cfg.getProperty("jdbc.url"));
        pool.setUsername(cfg.getProperty("jdbc.username"));
        pool.setPassword(cfg.getProperty("jdbc.password"));
        pool.setMinIdle(5);
        pool.setMaxIdle(10);
        pool.setMaxOpenPreparedStatements(100);
    }

    private static final class Lazy {
        private static final Store INST = new PsqlStore();
    }

    public static Store instOf() {
        return Lazy.INST;
    }

    @Override
    public boolean saveTicket(Ticket ticket) {
        int updated = 0;
        try (Connection con = pool.getConnection();
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO tickets(session_id, row, place, account_id)"
                            + " values (?, ?, ?, ?)")) {
            ps.setInt(1, ticket.getSessionId());
            ps.setInt(2, ticket.getRow());
            ps.setInt(3, ticket.getPlace());
            ps.setInt(4, ticket.getAccountId());
            updated = ps.executeUpdate();
        } catch (Exception e) {
            LOG.error("Error in saveTicket() method", e);
        }
        return updated > 0;
    }

    @Override
    public Account findAccountByEmail(String email) {
        Account accountToReturn = null;
        try (Connection con = pool.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE email = ?")) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                accountToReturn = new Account(
                        rs.getInt("id"),
                        rs.getString("userName"),
                        rs.getString("email"),
                        rs.getString("phone"));
            }
        } catch (Exception e) {
            LOG.error("Error in findAccountByEmail() method", e);
        }
        return accountToReturn;
    }

    @Override
    public List<Ticket> findTicketsBySession(String session) {
        List<Ticket> toReturn = new ArrayList<>();
        try (Connection con = pool.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM tickets WHERE session_id = ?")) {
            ps.setInt(1, Integer.parseInt(session));
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                toReturn.add(new Ticket(
                        rs.getInt("row"),
                        rs.getInt("place"),
                        rs.getInt("session_id"),
                        rs.getInt("account_id")
                ));
            }
        } catch (Exception e) {
            LOG.error("Error in method findTicketsBySession() method" + e);
        }
        return toReturn;
    }

}
