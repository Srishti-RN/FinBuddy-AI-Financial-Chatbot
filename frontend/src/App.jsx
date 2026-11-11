
import { useState } from "react";
import {
  LayoutDashboard, MessageCircle, Wallet, Target, Calculator,
  BookOpen, Settings, Bell, Search, ArrowUpRight, ArrowDownRight,
  IndianRupee, PiggyBank, TrendingUp, CreditCard, Menu, X,
  Send, Sparkles, ChevronRight
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, PieChart, Pie, Cell
} from "recharts";
import "./App.css";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "AI Assistant", icon: MessageCircle },
  { name: "Budget Planner", icon: Wallet },
  { name: "Savings Goals", icon: Target },
  { name: "EMI Calculator", icon: Calculator },
  { name: "Learn Finance", icon: BookOpen },
];

const monthlyData = [
  { month: "May", income: 30000, expenses: 18000 },
  { month: "Jun", income: 35000, expenses: 22000 },
  { month: "Jul", income: 32000, expenses: 19000 },
  { month: "Aug", income: 40000, expenses: 25000 },
  { month: "Sep", income: 38000, expenses: 23000 },
  { month: "Oct", income: 45000, expenses: 27000 },
  { month: "Nov", income: 42000, expenses: 24000 },
];

const expenseData = [
  { name: "Food", value: 8500, color: "#7566E8" },
  { name: "Shopping", value: 5000, color: "#F4A261" },
  { name: "Travel", value: 3500, color: "#42BFA5" },
  { name: "Bills", value: 4000, color: "#5C9DED" },
  { name: "Others", value: 3000, color: "#E98CA5" },
];

const transactions = [
  { name: "Grocery shopping", category: "Food & Drinks", date: "Today, 10:30 AM", amount: "-₹1,250", icon: "🛒", type: "expense" },
  { name: "Monthly allowance", category: "Income", date: "Today, 09:00 AM", amount: "+₹15,000", icon: "💰", type: "income" },
  { name: "Movie tickets", category: "Entertainment", date: "Yesterday", amount: "-₹650", icon: "🎬", type: "expense" },
  { name: "Metro recharge", category: "Transport", date: "Yesterday", amount: "-₹500", icon: "🚇", type: "expense" },
];

function App() {
  const [active, setActive] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [question, setQuestion] = useState("");

  const choosePage = (name) => {
    setActive(name);
    setMobileMenu(false);
  };

  return (
    <div className="app-shell">
      {mobileMenu && <div className="mobile-overlay" onClick={() => setMobileMenu(false)} />}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><IndianRupee size={23} /></div>
          <div>
            <h2>FinBuddy<span>.</span></h2>
            <small>YOUR MONEY COMPANION</small>
          </div>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}><X /></button>
        </div>

        <div className="nav-label">MENU</div>
        <nav className="navigation">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "active" : ""}`}
              onClick={() => choosePage(name)}
            >
              <Icon size={19} />
              <span>{name}</span>
              {name === "AI Assistant" && <span className="new-tag">AI</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={19} /></div>
            <h4>Smart money moves!</h4>
            <p>Make every rupee count with FinBuddy.</p>
            <button onClick={() => choosePage("AI Assistant")}>Explore AI <ChevronRight size={15} /></button>
          </div>
          <button className="nav-item settings-link" onClick={() => choosePage("Settings")}>
            <Settings size={19} /> <span>Settings</span>
          </button>
          <div className="profile">
            <div className="avatar">S</div>
            <div className="profile-info"><strong>My Account</strong><small>Personal Account</small></div>
            <span className="profile-dots">•••</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="top-left">
            <button className="mobile-menu" onClick={() => setMobileMenu(true)}><Menu /></button>
            <div>
              <div className="breadcrumb">Pages / <strong>{active}</strong></div>
              <h1>{active}</h1>
            </div>
          </div>
          <div className="top-actions">
            <div className="search-box"><Search size={17} /><input placeholder="Search anything..." /></div>
            <button className="notification"><Bell size={19} /><span /></button>
            <div className="top-avatar">S</div>
          </div>
        </header>

        {active === "Dashboard" ? (
          <div className="dashboard">
            <div className="welcome-row">
              <div>
                <h2>Good morning! <span>☀️</span></h2>
                <p>Here's what's happening with your money today.</p>
              </div>
              <div className="date-pill">📅 &nbsp; November 2026</div>
            </div>

            <section className="stats-grid">
              <StatCard title="Total Balance" amount="₹42,500" change="+12.5%" description="vs last month" icon={Wallet} color="purple" />
              <StatCard title="Monthly Income" amount="₹45,000" change="+8.2%" description="vs last month" icon={TrendingUp} color="green" />
              <StatCard title="Total Expenses" amount="₹24,000" change="-4.5%" description="vs last month" icon={CreditCard} color="orange" />
              <StatCard title="Total Savings" amount="₹21,000" change="+18.4%" description="vs last month" icon={PiggyBank} color="blue" />
            </section>

            <section className="charts-grid">
              <div className="panel income-panel">
                <div className="panel-heading">
                  <div><h3>Income vs Expenses</h3><p>Your financial activity over time</p></div>
                  <select defaultValue="7 months"><option>7 months</option><option>Last 30 days</option></select>
                </div>
                <div className="chart-legend">
                  <span><i className="legend-dot income-dot" /> Income</span>
                  <span><i className="legend-dot expense-dot" /> Expenses</span>
                </div>
                <div className="area-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7665E8" stopOpacity={0.22} />
                          <stop offset="95%" stopColor="#7665E8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F3A36B" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#F3A36B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECECF3" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9292A5", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9292A5", fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                      <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                      <Area type="monotone" dataKey="income" stroke="#7665E8" strokeWidth={2.5} fill="url(#incomeGradient)" />
                      <Area type="monotone" dataKey="expenses" stroke="#F3A36B" strokeWidth={2.5} fill="url(#expenseGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="panel expense-panel">
                <div className="panel-heading"><div><h3>Expense Breakdown</h3><p>Where your money goes</p></div><button className="more-button">•••</button></div>
                <div className="donut-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={expenseData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={4} stroke="none">
                        {expenseData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center"><strong>₹24,000</strong><span>Total spent</span></div>
                </div>
                <div className="expense-legend">
                  {expenseData.map((item) => (
                    <div className="expense-legend-item" key={item.name}>
                      <span><i style={{ background: item.color }} />{item.name}</span>
                      <strong>₹{item.value.toLocaleString("en-IN")}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bottom-grid">
              <div className="panel transactions-panel">
                <div className="panel-heading"><div><h3>Recent Transactions</h3><p>Your latest money movements</p></div><button className="text-link">View all <ChevronRight size={15} /></button></div>
                <div className="transaction-list">
                  {transactions.map((t) => (
                    <div className="transaction" key={t.name}>
                      <div className="transaction-icon">{t.icon}</div>
                      <div className="transaction-info"><strong>{t.name}</strong><small>{t.category} · {t.date}</small></div>
                      <strong className={t.type === "income" ? "positive" : "negative"}>{t.amount}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel savings-panel">
                <div className="panel-heading"><div><h3>Savings Goal</h3><p>You're doing amazing!</p></div><span className="goal-emoji">🎯</span></div>
                <div className="goal-title"><strong>New Laptop</strong><span>68%</span></div>
                <div className="progress-track"><div className="progress-fill" /></div>
                <div className="goal-amount"><strong>₹34,000</strong><span>of ₹50,000</span></div>
                <div className="goal-tip"><Sparkles size={16} /><span>Just ₹16,000 more to reach your goal. Keep going!</span></div>
                <button className="goal-button" onClick={() => choosePage("Savings Goals")}>View savings goals <ArrowUpRight size={16} /></button>
              </div>
            </section>

            <section className="ai-banner">
              <div className="ai-banner-icon"><Sparkles size={25} /></div>
              <div className="ai-banner-copy"><h3>Need help with your finances?</h3><p>Ask FinBuddy AI anything about budgeting, savings or investments.</p></div>
              <button onClick={() => choosePage("AI Assistant")}>Chat with AI <ArrowUpRight size={17} /></button>
            </section>

            <footer>© 2026 FinBuddy. Made to make money management simple. <span>Financial data shown is for demonstration.</span></footer>
          </div>
     ) : active === "AI Assistant" ? (
  <ChatPage />
) : active === "Budget Planner" ? (
  <BudgetPlanner />
) : active === "Savings Goals" ? (
  <SavingsGoals />
) : active === "EMI Calculator" ? (
  <EMICalculator />
) : active === "Learn Finance" ? (
  <LearnFinance />
) : (
          <section className="coming-soon">
            <div className="coming-icon"><Sparkles size={32} /></div>
            <h2>{active}</h2>
            <p>This module is coming soon! We're building your smart financial experience.</p>
            {active === "AI Assistant" && (
              <div className="quick-chat">
                <strong>Try asking FinBuddy</strong>
                <div className="suggestions">
                  {["How can I save ₹5,000 monthly?", "Explain SIP in simple words", "How does an EMI work?"].map((q) => (
                    <button key={q} onClick={() => setQuestion(q)}>{q} <ChevronRight size={14} /></button>
                  ))}
                </div>
                <div className="chat-input"><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a financial question..." /><button onClick={() => alert("AI chatbot backend will be connected in the next development stage.")}><Send size={17} /></button></div>
              </div>
            )}
            <button className="back-dashboard" onClick={() => choosePage("Dashboard")}>Back to Dashboard</button>
          </section>
        )}
      </main>
    </div>
  );
}


function LearnFinance() {
  const topics = [
    {
      title: "Budgeting Basics",
      category: "BEGINNER",
      description: "Learn how to manage monthly income and expenses.",
      content: "Start by listing your monthly income and essential expenses. The 50-30-20 rule suggests allocating 50% to needs, 30% to wants and 20% to savings. Adjust this based on your circumstances."
    },
    {
      title: "Understanding SIP",
      category: "INVESTMENTS",
      description: "Understand systematic investment plans.",
      content: "SIP stands for Systematic Investment Plan. It allows you to invest a fixed amount regularly in mutual funds. Returns are market-linked and not guaranteed."
    },
    {
      title: "Emergency Funds",
      category: "SAVINGS",
      description: "Build a financial safety net for unexpected expenses.",
      content: "An emergency fund helps cover unexpected expenses such as medical bills or job loss. A common goal is to save three to six months of essential expenses."
    },
    {
      title: "Understanding Loans",
      category: "LOANS",
      description: "Learn about interest rates, principal and EMIs.",
      content: "A loan is borrowed money that must be repaid with interest. Compare interest rates, processing fees, repayment tenure and total repayment before borrowing."
    },
    {
      title: "Fixed Deposits",
      category: "SAVINGS",
      description: "Discover how fixed deposits work.",
      content: "A fixed deposit lets you deposit money with a bank for a chosen period at a specified interest rate. Check the interest rate, premature withdrawal rules and applicable tax."
    },
    {
      title: "Credit Score",
      category: "CREDIT",
      description: "Understand why your credit history matters.",
      content: "A credit score reflects your credit history. Paying EMIs and credit card bills on time, maintaining responsible credit utilisation and checking your credit report can help maintain a healthy score."
    }
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="learn-page">
      <h2>Learn Finance 📚</h2>
      <p>Improve your financial knowledge, one topic at a time.</p>

      {selected === null ? (
        <div className="learn-grid">
          {topics.map((topic, index) => (
            <div className="learn-card" key={index}>
              <span>{topic.category}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <button onClick={() => setSelected(index)}>
                Read More →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="learn-article">
          <button onClick={() => setSelected(null)}>
            ← Back to Topics
          </button>
          <span>{topics[selected].category}</span>
          <h2>{topics[selected].title}</h2>
          <p>{topics[selected].content}</p>
        </div>
      )}
    </div>
  );
}


function EMICalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  const emi = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate *
      Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  const format = (value) =>
    Math.round(value).toLocaleString("en-IN");

  return (
    <div className="emi-page">
      <h2>EMI Calculator</h2>
      <p>Calculate your monthly loan payments instantly.</p>

      <div className="emi-layout">
        <div className="emi-input-card">
          <h3>Loan Details</h3>

          <label>Loan Amount (₹)</label>
          <input
            type="number"
            min="1"
            value={principal}
            onChange={e => setPrincipal(Math.max(1, Number(e.target.value)))}
          />

          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={rate}
            onChange={e => setRate(Math.min(100, Math.max(0, Number(e.target.value))))}
          />

          <label>Loan Tenure (Years)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={years}
            onChange={e => setYears(Math.min(30, Math.max(1, Number(e.target.value))))}
          />
        </div>

        <div className="emi-result-card">
          <span>Your Monthly EMI</span>
          <h1>₹{format(emi)}</h1>

          <div className="emi-result-row">
            <span>Principal Amount</span>
            <strong>₹{format(principal)}</strong>
          </div>

          <div className="emi-result-row">
            <span>Total Interest</span>
            <strong>₹{format(totalInterest)}</strong>
          </div>

          <div className="emi-result-row">
            <span>Total Payment</span>
            <strong>₹{format(totalPayment)}</strong>
          </div>

          <div className="emi-note">
            Your EMI is calculated using the standard reducing-balance loan formula.
          </div>
        </div>
      </div>
    </div>
  );
}


function SavingsGoals() {
  const [goals, setGoals] = useState([
    { id: 1, name: "Emergency Fund", target: 50000, saved: 15000 },
    { id: 2, name: "New Laptop", target: 80000, saved: 25000 },
    { id: 3, name: "Vacation", target: 30000, saved: 10000 }
  ]);

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  function addGoal(e) {
    e.preventDefault();

    if (!name.trim() || Number(target) <= 0) return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        name: name.trim(),
        target: Number(target),
        saved: 0
      }
    ]);

    setName("");
    setTarget("");
  }

  function updateSaved(id, value) {
    setGoals(goals.map(goal =>
      goal.id === id
        ? { ...goal, saved: Math.min(goal.target, Math.max(0, Number(value))) }
        : goal
    ));
  }

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  return (
    <div className="goals-page">
      <h2>My Savings Goals</h2>
      <p>Set targets, track your progress and achieve your dreams.</p>

      <div className="goal-summary">
        <div>
          <span>Total Saved</span>
          <h2>₹{totalSaved.toLocaleString("en-IN")}</h2>
        </div>
        <div>
          <span>Total Target</span>
          <h2>₹{totalTarget.toLocaleString("en-IN")}</h2>
        </div>
        <div>
          <span>Active Goals</span>
          <h2>{goals.filter(g => g.saved < g.target).length}</h2>
        </div>
      </div>

      <div className="goal-list">
        <h3>Your Goals</h3>

        {goals.map(goal => {
          const percent = Math.round(
            (goal.saved / goal.target) * 100
          );

          return (
            <div className="goal-card" key={goal.id}>
              <div className="goal-card-top">
                <strong>{goal.name}</strong>
                <span>{percent}%</span>
              </div>

              <div className="goal-progress">
                <div style={{ width: `${percent}%` }} />
              </div>

              <div className="goal-amounts">
                <span>Saved: ₹{goal.saved.toLocaleString("en-IN")}</span>
                <span>Target: ₹{goal.target.toLocaleString("en-IN")}</span>
              </div>

              {goal.saved >= goal.target ? (
                <strong className="goal-complete">🎉 Goal achieved!</strong>
              ) : (
                <div className="goal-update">
                  <label>Update amount saved (₹)</label>
                  <input
                    type="number"
                    min="0"
                    max={goal.target}
                    value={goal.saved}
                    onChange={e => updateSaved(goal.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <form className="goal-form" onSubmit={addGoal}>
        <h3>Create a New Savings Goal</h3>
        <input
          placeholder="Goal name (e.g. New Phone)"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Target amount ₹"
          value={target}
          onChange={e => setTarget(e.target.value)}
          required
        />
        <button type="submit">+ Add Savings Goal</button>
      </form>
    </div>
  );
}


function BudgetPlanner() {
  const [income, setIncome] = useState(45000);
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Food", amount: 8500 },
    { id: 2, name: "Shopping", amount: 5000 },
    { id: 3, name: "Rent & Bills", amount: 4500 }
  ]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const total = expenses.reduce(
    (sum, item) => sum + Number(item.amount), 0
  );

  const remaining = Number(income) - total;
  const savings = Math.max(0, remaining);
  const percentage = income > 0
    ? Math.round((savings / income) * 100)
    : 0;

  function addExpense(e) {
    e.preventDefault();

    if (!name.trim() || Number(amount) <= 0) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        name: name.trim(),
        amount: Number(amount)
      }
    ]);

    setName("");
    setAmount("");
  }

  return (
    <div className="budget-page">
      <div className="budget-heading">
        <h2>Monthly Budget Planner</h2>
        <p>Plan your money, track expenses and grow your savings.</p>
      </div>

      <div className="budget-income-card">
        <label>Monthly Income (₹)</label>
        <input
          type="number"
          min="0"
          value={income}
          onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
        />
        <small>Enter your monthly take-home income</small>
      </div>

      <div className="budget-stats">
        <div className="budget-stat">
          <span>Total Income</span>
          <h2>₹{Number(income).toLocaleString("en-IN")}</h2>
        </div>

        <div className="budget-stat">
          <span>Total Expenses</span>
          <h2>₹{total.toLocaleString("en-IN")}</h2>
        </div>

        <div className="budget-stat">
          <span>Remaining Balance</span>
          <h2 className={remaining < 0 ? "budget-negative" : "budget-positive"}>
            ₹{remaining.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      <div className="budget-main-card">
        <h3>Expense Breakdown</h3>
        <p>Track where your money goes every month.</p>

        {expenses.length === 0 && <p>No expenses added yet.</p>}

        {expenses.map((item) => (
          <div className="expense-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>₹{item.amount.toLocaleString("en-IN")}</span>
            </div>

            <div className="expense-bar">
              <div
                style={{
                  width: `${income > 0 ? Math.min((item.amount / income) * 100, 100) : 0}%`
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setExpenses(
                expenses.filter((expense) => expense.id !== item.id)
              )}
            >
              Remove
            </button>
          </div>
        ))}

        <form className="add-expense-form" onSubmit={addExpense}>
          <input
            placeholder="Expense name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            min="1"
            placeholder="Amount ₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button type="submit">+ Add Expense</button>
        </form>
      </div>

      <div className="budget-main-card savings-card">
        <h3>Your Savings Summary</h3>
        <div className="savings-number">
          ₹{savings.toLocaleString("en-IN")}
        </div>
        <p>Available balance after expenses</p>

        <div className="savings-progress">
          <div style={{ width: `${Math.min(percentage, 100)}%` }} />
        </div>

        <strong>{percentage}% of your income remains</strong>

        {remaining < 0 && (
          <p className="budget-negative">
            Your expenses exceed your income. Consider reducing spending.
          </p>
        )}
      </div>
    </div>
  );
}


function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hey there! 👋 I'm FinBuddy, your personal financial education assistant. Ask me anything about budgeting, savings, loans, EMIs or investments. How can I help you today?"
    }
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "How can I save ₹5,000 every month?",
    "Explain SIP in simple words",
    "How does an EMI work?",
    "Help me create a monthly budget"
  ];

  async function sendMessage(text) {
    const message = text.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: message }
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply,
          mode: data.mode
        }
      ]);

    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: `Sorry! ${error.message} Please check that your backend is running on port 5000.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(question);
  }

  return (
    <div className="chat-page">
      <div className="chat-welcome">
        <div className="chat-welcome-icon">
          <Sparkles size={28} />
        </div>
        <h2>Your money questions, answered.</h2>
        <p>
          Meet FinBuddy AI — your friendly companion for smarter
          financial decisions and better money habits.
        </p>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-bot-avatar">
            <IndianRupee size={21} />
          </div>
          <div className="chat-header-info">
            <strong>FinBuddy AI</strong>
            <span><i /> Online financial assistant</span>
          </div>
          <span className="chat-ai-tag">
            <Sparkles size={12} /> AI POWERED
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              className={`message-row ${message.role === "user" ? "user-row" : ""}`}
              key={index}
            >
              {message.role === "assistant" && (
                <div className="message-avatar">
                  <IndianRupee size={16} />
                </div>
              )}

              <div className={`message-bubble ${message.role}`}>
                <p>{message.text}</p>
                {message.mode === "demo" && (
                  <small className="demo-label">Demo response</small>
                )}
              </div>

              {message.role === "user" && (
                <div className="user-message-avatar">S</div>
              )}
            </div>
          ))}

          {loading && (
            <div className="message-row">
              <div className="message-avatar">
                <IndianRupee size={16} />
              </div>
              <div className="message-bubble assistant typing-bubble">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="chat-suggestions">
            <strong><Sparkles size={15} /> Try asking me</strong>
            <div className="suggestion-grid">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  disabled={loading}
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                  <ChevronRight size={15} />
                </button>
              ))}
            </div>
          </div>
        )}

        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask me anything about your finances..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!question.trim() || loading}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>

        <p className="chat-disclaimer">
          FinBuddy provides financial education, not professional financial advice.
          Always consider risks before making financial decisions.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, amount, change, description, icon: Icon, color }) {
  const isPositive = color !== "orange";
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{title}</span><div className={`stat-icon ${color}`}><Icon size={20} /></div></div>
      <h2>{amount}</h2>
      <div className="stat-change">
        <span className={isPositive ? "positive" : "neutral"}>{isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}</span>
        <small>{description}</small>
      </div>
    </div>
  );
}

export default App;
