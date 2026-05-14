// UI ROUTES
app.get("/jobs", (req, res) => {
  res.render("jobs/index");
});

app.get("/jobs/new", (req, res) => {
  res.render("jobs/new");
});

app.get("/customers", (req, res) => {
  res.render("customers/index");
});

app.get("/customers/new", (req, res) => {
  res.render("customers/new");
});

app.get("/technicians", (req, res) => {
  res.render("technicians/index");
});

app.get("/technicians/new", (req, res) => {
  res.render("technicians/new");
});

