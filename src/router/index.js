import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Header from "@/components/Header";
import Branches from "@/components/Branches";
import BranchAdd from "@/components/BranchAdd";
import Sectors from "@/components/Sectors";
import SectorAdd from "@/components/SectorAdd";
import Positions from "@/components/Positions";
import PositionAdd from "@/components/PositionAdd";
import Employees from "@/components/Employees";
import Users from "@/components/Users";
import UserAdd from "@/components/UserAdd";

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
      path: "/branches",
      name: "Branches",
      component: Branches
    },
    {
      path: "/branch_add",
      name: "BranchAdd",
      component: BranchAdd
    },
    {
      path: "/sectors",
      name: "Sectors",
      component: Sectors
    },
    {
      path: "/sector_add",
      name: "SectorAdd",
      component: SectorAdd
    },
    {
      path: "/positions",
      name: "Positions",
      component: Positions
    },
    {
      path: "/position_add",
      name: "PositionAdd",
      component: PositionAdd
    },
    {
      path: "/employees",
      name: "Employees",
      component: Employees
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/user_add",
      name: "UserAdd",
      component: UserAdd
    }
  ]
});
