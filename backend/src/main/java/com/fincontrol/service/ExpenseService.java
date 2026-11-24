package com.fincontrol.service;

import com.fincontrol.model.Expense;
import com.fincontrol.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;
    public ExpenseService(ExpenseRepository repository) { this.repository = repository; }
    public List<Expense> findAll() { return repository.findAll(); }
    public Expense create(Expense expense) { return repository.save(expense); }
    public void delete(Long id) { repository.deleteById(id); }
}
