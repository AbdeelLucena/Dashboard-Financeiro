package com.fincontrol.controller;

import com.fincontrol.model.Expense;
import com.fincontrol.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    private final ExpenseService service;
    public ExpenseController(ExpenseService service) { this.service = service; }
    @GetMapping public List<Expense> all() { return service.findAll(); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Expense create(@Valid @RequestBody Expense expense) { return service.create(expense); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { service.delete(id); }
}
