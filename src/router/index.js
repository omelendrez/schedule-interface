import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Header from "@/components/Header";
import Availability from "@/components/Availability";
import AvailabilityEdit from "@/components/AvailabilityEdit";
import Branches from "@/components/Branches";
import Branch from "@/components/Branch";
import Sectors from "@/components/Sectors";
import Sector from "@/components/Sector";
import Positions from "@/components/Positions";
import Position from "@/components/Position";
import Employees from "@/components/Employees";
import Employee from "@/components/Employee";
import Users from "@/components/Users";
import User from "@/components/User";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/header",
      name: "Header",
      component: Header
    },
    {
      path: "/availability",
      name: "Availability",
      component: Availability
    },
    {
      path: "/availability_edit",
      name: "AvailabilityEdit",
      component: AvailabilityEdit
    },
    {
      path: "/branches",
      name: "Branches",
      component: Branches
    },
    {
      path: "/branch",
      name: "Branch",
      component: Branch
    },
    {
      path: "/sectors",
      name: "Sectors",
      component: Sectors
    },
    {
      path: "/sector",
      name: "Sector",
      component: Sector
    },
    {
      path: "/positions",
      name: "Positions",
      component: Positions
    },
    {
      path: "/position",
      name: "Position",
      component: Position
    },
    {
      path: "/employees",
      name: "Employees",
      component: Employees
    },
    {
      path: "/employee",
      name: "Employee",
      component: Employee
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/user",
      name: "User",
      component: User
    }
  ]
});
