import type { DataSource } from "./types";

// Prepopulated mock data sources. These are deliberately small — the schema and a
// few sample rows are injected into the model context when @-mentioned so the
// agent can build realistic, data-bound UI without a live backend.
export const SEED_DATA_SOURCES: DataSource[] = [
  {
    id: "ds-users",
    name: "users",
    description: "Application user accounts with role and status.",
    builtin: true,
    columns: [
      { name: "id", type: "uuid" },
      { name: "name", type: "text" },
      { name: "email", type: "text" },
      { name: "role", type: "enum(admin,member,viewer)" },
      { name: "status", type: "enum(active,invited,suspended)" },
      { name: "created_at", type: "timestamp" },
    ],
    sample: [
      { id: "u_01", name: "Avery Chen", email: "avery@acme.io", role: "admin", status: "active", created_at: "2026-01-12" },
      { id: "u_02", name: "Jordan Patel", email: "jordan@acme.io", role: "member", status: "active", created_at: "2026-02-03" },
      { id: "u_03", name: "Sam Rivera", email: "sam@acme.io", role: "viewer", status: "invited", created_at: "2026-03-21" },
    ],
  },
  {
    id: "ds-orders",
    name: "orders",
    description: "Customer orders with line totals and fulfillment state.",
    builtin: true,
    columns: [
      { name: "id", type: "text" },
      { name: "customer", type: "text" },
      { name: "total", type: "currency" },
      { name: "items", type: "int" },
      { name: "status", type: "enum(paid,pending,refunded,shipped)" },
      { name: "placed_at", type: "timestamp" },
    ],
    sample: [
      { id: "#1042", customer: "Avery Chen", total: 128.0, items: 3, status: "shipped", placed_at: "2026-06-01" },
      { id: "#1043", customer: "Jordan Patel", total: 54.5, items: 1, status: "paid", placed_at: "2026-06-02" },
      { id: "#1044", customer: "Sam Rivera", total: 312.99, items: 7, status: "pending", placed_at: "2026-06-03" },
    ],
  },
  {
    id: "ds-products",
    name: "products",
    description: "Catalog of products with price, inventory and rating.",
    builtin: true,
    columns: [
      { name: "sku", type: "text" },
      { name: "title", type: "text" },
      { name: "price", type: "currency" },
      { name: "stock", type: "int" },
      { name: "rating", type: "float" },
      { name: "category", type: "text" },
    ],
    sample: [
      { sku: "CR8-100", title: "Aero Standing Desk", price: 489.0, stock: 24, rating: 4.7, category: "Workspace" },
      { sku: "CR8-220", title: "Lumen Task Lamp", price: 79.0, stock: 140, rating: 4.4, category: "Lighting" },
      { sku: "CR8-310", title: "Pulse Wireless Keyboard", price: 119.0, stock: 0, rating: 4.8, category: "Accessories" },
    ],
  },
  {
    id: "ds-tickets",
    name: "support_tickets",
    description: "Support tickets with priority and assignee for dashboards.",
    builtin: true,
    columns: [
      { name: "id", type: "text" },
      { name: "subject", type: "text" },
      { name: "priority", type: "enum(low,medium,high,urgent)" },
      { name: "assignee", type: "text" },
      { name: "status", type: "enum(open,pending,resolved)" },
    ],
    sample: [
      { id: "T-501", subject: "Login link expired", priority: "high", assignee: "Avery Chen", status: "open" },
      { id: "T-502", subject: "Invoice PDF missing", priority: "medium", assignee: "Jordan Patel", status: "pending" },
      { id: "T-503", subject: "Feature request: dark mode", priority: "low", assignee: "Sam Rivera", status: "open" },
    ],
  },
];

export function describeDataSource(ds: DataSource): string {
  const cols = ds.columns.map((c) => `${c.name}:${c.type}`).join(", ");
  const rows = JSON.stringify(ds.sample, null, 0);
  return `table "${ds.name}" — ${ds.description}\n  columns: ${cols}\n  sample rows: ${rows}`;
}
