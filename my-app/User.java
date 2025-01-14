import java.util.*;

public class User {
    private ArrayList<String> wishlist;
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private User santa;

    public User(String username, String password, String firstname, String lastname) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.wishlist = new ArrayList<String>();
    }

    public void wishList(String item) {
        wishlist.add(item);
    }

    public String[] getwishlist() {
        return wishlist.toArray(new String[0]);
    }
}