// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto";
// import "./event-dashboard.css";
// import { events } from "@/types/event";

// function Dashboard() {
//   const [events, setEvents] = useState<events[]>([]);
//   const [transactions, setTransactions] = useState([]);
//   const [stats, setStats] = useState<events>({ labels: [], data: {} });

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         const response = await fetch("http://localhost:8000/api/v1/events");
//         const data = await response.json();
//         setEvents(data.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     }

//     async function fetchTransactions() {
//       try {
//         const response = await fetch(
//           "http://localhost:8000/api/v1/transactions"
//         );
//         const data = await response.json();
//         setTransactions(data.data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     }

//     fetchEvents();
//     fetchTransactions();
//   }, []);

//   useEffect(() => {
//     if (events.length > 0) {
//       setStats({
//         labels: events.map((event) => event.name),
//         data: 
//           {
//             label: "Attendees",
//             data: events.map((event) => event.attendees),
//             borderColor: "#4F46E5",
//             backgroundColor: "rgba(79, 70, 229, 0.2)",
//             borderWidth: 2,
//             tension: 0.4,
//           },
//       });
//     }
//   }, [events]);

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Event Dashboard</h1>

//       <div className="card">
//         <h2 className="card-title">Upcoming Events</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Attendees</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map((event) => (
//               <tr key={event.id}>
//                 <td>{event.name}</td>
//                 <td>{event.date}</td>
//                 <td>{event.attendees}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2 className="card-title">Recent Transactions</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Event</th>
//               <th>Amount ($)</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((tx) => (
//               <tr key={tx.id}>
//                 <td>{tx.event}</td>
//                 <td>{tx.amount}</td>
//                 <td>{tx.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="card">
//         <h2 className="card-title">Event Statistics</h2>
//         {stats.labels.length > 0 && <Line data={stats} />}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
