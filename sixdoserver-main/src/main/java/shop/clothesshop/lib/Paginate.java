package shop.clothesshop.lib;

import java.util.List;

public class Paginate <T> {
    public int total;
    public List<T> results;

    public Paginate(int total, List<T> result) {
        this.total = total;
        this.results = result;
    }
}
