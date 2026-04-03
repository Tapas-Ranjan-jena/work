import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageTopBar from "../../components/common/PageTopBar";
import dashboardService from "../../services/dashboardService";
import tasksService from "../../services/tasksService";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import TaskList from "../../components/dashboard/TaskList";
import StatsCard from "../../components/dashboard/StatsCard";
import UpdatesList from "../../components/dashboard/UpdatesList";
import BarChart from "../../components/dashboard/Charts/BarChart";
import LineChart from "../../components/dashboard/Charts/LineChart";
import PieChart from "../../components/dashboard/Charts/PieChart";
import AssignmentTimeline from "../../components/dashboard/AssignmentTimeline";
import AddTaskModal from "../dashboard/assignments/modals/AddTaskModal";
import DashboardTabs from "../../components/dashboard/DashboardTabs";
import NotesView from "../../components/dashboard/NotesView";
import MCAServicesView from "../../components/dashboard/MCAServicesView";
import AnnualFilingView from "../../components/dashboard/AnnualFilingView";
import ComplianceCalendarView from "../../components/dashboard/ComplianceCalendarView";
import RTAServicesView from "../../components/dashboard/RTAServicesView";
import AttendanceLoginView from "../../components/dashboard/AttendanceLoginView";

type LayoutContext = {
    setOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
    open: boolean;
};

export default function Dashboard() {
    const { setOpen } = useOutletContext<LayoutContext>();
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [tasks, setTasks] = useState<any[]>([]);
    const [updates, setUpdates] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [incomeExpense, setIncomeExpense] = useState<any[]>([]);
    const [financeBreakdown, setFinanceBreakdown] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [activeTab, setActiveTab] = useState("Dashboard");

    const userName = (user?.firstName && user?.lastName) 
        ? `${user.firstName} ${user.lastName}` 
        : "User";

    const extractData = (res: any) => {
        if (!res) return [];
        if (Array.isArray(res)) return res;
        if (res.data && Array.isArray(res.data)) return res.data;
        if (res.data && res.data.data && Array.isArray(res.data.data)) return res.data.data;
        if (res.tasks && Array.isArray(res.tasks)) return res.tasks;
        if (res.data && res.data.tasks && Array.isArray(res.data.tasks)) return res.data.tasks;
        if (res.data && res.data.items && Array.isArray(res.data.items)) return res.data.items;
        return [];
    };

    const mockStarredTasks = [
        { id: 1, title: "Develop Customer API for Mobile App", priority: "High", status: "In Progress" },
        { id: 2, title: "File Annual Return Acme Corporation", priority: "Medium", status: "Pending" },
        { id: 3, title: "Update Financial Statement Q1", priority: "High", status: "Completed" },
        { id: 4, title: "Review Marketing Strategy for Q2", priority: "Medium", status: "New" },
        { id: 5, title: "Meeting with IT Support Team", priority: "Low", status: "Scheduled" },
        { id: 6, title: "Prepare Tax Audit Documents", priority: "High", status: "Pending" },
        { id: 7, title: "Website Security Patch Update", priority: "High", status: "Planned" },
    ];

    const mockPaymentsMonthly = [
        { label: "Jan", amount: 120000 },
        { label: "Feb", amount: 150000 },
        { label: "Mar", amount: 180000 },
        { label: "Apr", amount: 220000 },
        { label: "May", amount: 160000 },
    ];

    const mockPaymentsYearly = [
        { label: "2021", amount: 1500000 },
        { label: "2022", amount: 1850000 },
        { label: "2023", amount: 2100000 },
        { label: "2024", amount: 2450000 },
        { label: "2025", amount: 2800000 },
    ];

    const mockPaymentsDaily = [
        { label: "Mon", amount: 12000 },
        { label: "Tue", amount: 15000 },
        { label: "Wed", amount: 18000 },
        { label: "Thu", amount: 22000 },
        { label: "Fri", amount: 16000 },
        { label: "Sat", amount: 8000 },
        { label: "Sun", amount: 5000 },
    ];

    const mockIncomeExpense = [
        { month: "Jan", income: 4500, expense: 3200 },
        { month: "Feb", income: 5200, expense: 3800 },
        { month: "Mar", income: 4800, expense: 4100 },
        { month: "Apr", income: 6100, expense: 4200 },
        { month: "May", income: 5900, expense: 4500 },
        { month: "Jun", income: 6500, expense: 4800 },
    ];

    const mockFinance = [
        { category: "Team Payroll", value: 250000 },
        { category: "Operational Costs", value: 120000 },
        { category: "Marketing", value: 80000 },
        { category: "Miscellaneous", value: 50000 },
    ];

    const mockUpdates = [
        { id: 101, title: "Set Default time for Meetings", tag: "New", updated_at: "2026-01-02" },
        { id: 102, title: "Client Data Collection for Annual Filing", tag: "New", updated_at: "2026-02-16" },
        { id: 103, title: "V3 Annual Filing Forms", tag: "New", updated_at: "2026-03-26" },
    ];

    const fetchRef = useState({ active: false })[0];


    const fetchData = async () => {
        // ⭐ CONCURRENCY GUARD: Prevent multiple concurrent fetches
        if (fetchRef.active) return;
        fetchRef.active = true;

        try {
            setLoading(true);
            
            // 1. Fetch Core Stats First (Fastest)
            const statsRes = await dashboardService.getStats();
            const sData = statsRes.data || statsRes;
            setStats(sData.tasks || {});
            
            // 2. Fetch Tasks
            const tasksRes = await tasksService.getAllTasks(1, 10, undefined, true);
            const activities = sData.recent_activities || [];
            setTasks(activities.length > 0 ? activities : extractData(tasksRes));

            // 3. Sequential fetch for remaining charts to avoid 429 spam
            const updatesRes = await dashboardService.getUpdates(10);
            const uData = extractData(updatesRes);
            setUpdates(uData.length > 0 ? uData.map((u: any) => ({
                ...u,
                updated_at: u.date || u.updated_at,
                tag: u.tag || "New"
            })) : mockUpdates);

            const paymentsRes = await dashboardService.getPayments();
            const pData = extractData(paymentsRes);
            setPayments(pData.recent_payments || pData);

            const incExpRes = await dashboardService.getIncomeExpense();
            const ieRaw = incExpRes.data || incExpRes;
            if (ieRaw.income || ieRaw.expense) {
                const months = Array.from(new Set([
                    ...(ieRaw.income || []).map((i: any) => i.month),
                    ...(ieRaw.expense || []).map((e: any) => e.month)
                ]));
                const merged = months.map(m => ({
                    month: m,
                    income: parseFloat((ieRaw.income || []).find((i: any) => i.month === m)?.amount || 0),
                    expense: parseFloat((ieRaw.expense || []).find((e: any) => e.month === m)?.amount || 0)
                }));
                setIncomeExpense(merged);
            } else {
                setIncomeExpense(mockIncomeExpense);
            }

            const financeRes = await dashboardService.getFinanceBreakdown();
            const fbData = extractData(financeRes);
            setFinanceBreakdown(fbData.length > 0 ? fbData.map((f: any) => ({
                category: f.label || f.category,
                value: parseFloat(f.value)
            })) : mockFinance);

        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
            setTasks(mockStarredTasks);
            setUpdates(mockUpdates);
            setPayments(mockPaymentsMonthly);
            setIncomeExpense(mockIncomeExpense);
            setFinanceBreakdown(mockFinance);
        } finally {
            setLoading(false);
            fetchRef.active = false;
        }
    };

    useEffect(() => {
        fetchData();
        const handleRefresh = () => fetchData();
        window.addEventListener("taskCreated", handleRefresh);
        return () => window.removeEventListener("taskCreated", handleRefresh);
    }, []);

    if (loading) {
        return (
            <div className="container-fluid p-4 text-center py-5">
            <div className="d-none d-lg-block">
                <PageTopBar onMenuClick={() => setOpen((prev: any) => !prev)} />
            </div>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid p-2 p-md-4" style={{ backgroundColor: "#f3f4f7", minHeight: "100vh" }}>
            <div className="d-none d-lg-block">
                <PageTopBar onMenuClick={() => setOpen((prev: any) => !prev)} />
            </div>

            <DashboardTabs 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddTask={() => setShowAddTaskModal(true)} 
            />

            {activeTab === "Dashboard" && (
                <div className="row g-4">
                    {/* LEFT COLUMN */}
                    <div className="col-12 col-xl-3">
                        <div className="d-flex flex-column gap-4 h-100">
                            <WelcomeCard userName={userName} onCreateTask={() => setShowAddTaskModal(true)} />
                            <TaskList tasks={tasks} />
                        </div>
                    </div>

                    {/* MIDDLE COLUMN */}
                    <div className="col-12 col-xl-5">
                        <div className="d-flex flex-column gap-4 h-100">
                            <StatsCard stats={stats || {}} />
                            <UpdatesList updates={updates} />
                            <LineChart data={incomeExpense} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="col-12 col-xl-4">
                        <div className="d-flex flex-column gap-4">
                            <AssignmentTimeline />
                            <BarChart 
                                monthlyData={payments.length > 0 ? payments.map(d => ({ label: d.month || d.label, amount: d.amount })) : mockPaymentsMonthly} 
                                yearlyData={mockPaymentsYearly}
                                dailyData={mockPaymentsDaily}
                            />
                            <PieChart data={financeBreakdown} />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "Notes" && <NotesView />}

            {activeTab === "MCA Services" && <MCAServicesView />}
            {activeTab === "Annual Filing" && <AnnualFilingView />}
            {activeTab === "Compliance Calendar" && <ComplianceCalendarView />}
            {activeTab === "RTA Services" && <RTAServicesView />}
            {activeTab === "Log in" && <AttendanceLoginView />}

            {(activeTab !== "Dashboard" && activeTab !== "Notes" && activeTab !== "Log in" && activeTab !== "MCA Services" && activeTab !== "Annual Filing" && activeTab !== "Compliance Calendar" && activeTab !== "RTA Services") && (
                <div className="card shadow-sm border-0 p-5 text-center" style={{ borderRadius: "16px" }}>
                    <div className="py-5">
                        <i className="bi bi-cone-striped display-1 text-muted opacity-25"></i>
                        <h4 className="mt-4 fw-bold text-dark">{activeTab}</h4>
                        <p className="text-muted">This module is currently under development.</p>
                        <button className="btn btn-primary rounded-pill px-4" onClick={() => setActiveTab("Dashboard")}>
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            )}

            <AddTaskModal 
                open={showAddTaskModal} 
                onClose={() => setShowAddTaskModal(false)} 
            />
        </div>
    );
}
