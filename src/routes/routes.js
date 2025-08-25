// import React, { useContext } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// import LoginPage from '../pages/LoginPage';
// import RegisterPage from '../pages/RegisterPage';
// import AdminDashboard from '../pages/AdminDashboard';

// import ProtectedRoute from './ProtectedRoutes';


// import UserManagementPage from '../pages/UserManagementPage';

// import GameManagementPage from '../pages/GameManagementPage'; // adapte le chemin si nécessaire
// import ChildManagementPage from '../pages/ChildManagementPage';

// import ParentDashboardPage from '../pages/parent/ParentDashboardPage';
// import ScanAndPlayPage from '../pages/operator/ScanAndPlayPage';
// import OperatorDashboardPage from '../pages/OperatorDashboardPage';
// import CashierDashboardPage from '../pages/caissier/CashierDashboardPage';
// import SalePointPage from '../pages/admin/SalePointPage'; // adapte le chemin selon ton arborescence
// import MenuItemPage from '../pages/admin/MenuItemPage';
// import AgentDashboardPage from '../pages/AgentDashboardPage';

// const AppRoutes = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <Routes>
//       {/* Routes publiques */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* Route protégée pour l'administrateur */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           <ProtectedRoute role="admin">
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />


//       <Route
//   path="/caissier/dashboard"
//   element={
//     <ProtectedRoute role="caissier">
//       <CashierDashboardPage />
//     </ProtectedRoute>
//   }
// />




//       <Route
//   path="/admin/users"
//   element={
//     <ProtectedRoute role="admin">
//       <UserManagementPage />
//     </ProtectedRoute>
//   }
// />


// <Route
//   path="/admin/espaces"
//   element={
//     <ProtectedRoute role="admin">
//       <SalePointPage />
//     </ProtectedRoute>
//   }
// />


// <Route
//   path="/admin/menus"
//   element={
//     <ProtectedRoute role="admin">
//       <MenuItemPage />
//     </ProtectedRoute>
//   }
// />


// <Route
//   path="/admin/games"
//   element={
//     <ProtectedRoute role="admin">
//       <GameManagementPage />
//     </ProtectedRoute>
//   }
// />


// <Route
//   path="/admin/children"
//   element={
//     <ProtectedRoute role="admin">
//       <ChildManagementPage />
//     </ProtectedRoute>
//   }
// />


// <Route
//   path="/parent-dashboard"
//   element={
//     <ProtectedRoute role="parent">
//       <ParentDashboardPage />
//     </ProtectedRoute>
//   }
// />

//       <Route
//         path="/agent-dashboard"
//         element={
//           <ProtectedRoute role="agent">
//             <AgentDashboardPage />
//           </ProtectedRoute>
//         }
//       />

// <Route
//   path="/operator/play"
//   element={
//     <ProtectedRoute role="operator">
//       <ScanAndPlayPage />
//     </ProtectedRoute>
//   }
// />


// <Route
//   path="/operator-dashboard"
//   element={
//     <ProtectedRoute role="operator">
//       <OperatorDashboardPage />
//     </ProtectedRoute>
//   }
// />



//       {/* Redirection par défaut selon utilisateur connecté */}
//       <Route
//         path="*"
//         element={
//           user ? (
//             <Navigate to={`/${user.role}-dashboard`} replace />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;




import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import HomePage from '../pages/HomePage';            // ➜ new
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboard from '../pages/AdminDashboard';

import ProtectedRoute from './ProtectedRoutes';

import UserManagementPage from '../pages/UserManagementPage';
import GameManagementPage from '../pages/GameManagementPage';
import ChildManagementPage from '../pages/ChildManagementPage';

import ParentDashboardPage from '../pages/parent/ParentDashboardPage';
import ScanAndPlayPage from '../pages/operator/ScanAndPlayPage';
import OperatorDashboardPage from '../pages/OperatorDashboardPage';
import CashierDashboardPage from '../pages/caissier/CashierDashboardPage';
import SalePointPage from '../pages/admin/SalePointPage';
import MenuItemPage from '../pages/admin/MenuItemPage';
import AgentDashboardPage from '../pages/AgentDashboardPage';

const roleHome = {
  admin: '/admin-dashboard',
  parent: '/parent-dashboard',
  operator: '/operator/play',
  caissier: '/caissier/dashboard',
  agent: '/agent-dashboard',
};

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Page d'accueil publique */}
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* Login/Register (si déjà connecté, renvoyer vers le bon dashboard) */}
      <Route
        path="/login"
        element={user ? <Navigate to={roleHome[user.role] || '/'} replace /> : <LoginPage />}
      />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caissier/dashboard"
        element={
          <ProtectedRoute role="caissier">
            <CashierDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/espaces"
        element={
          <ProtectedRoute role="admin">
            <SalePointPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/menus"
        element={
          <ProtectedRoute role="admin">
            <MenuItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/games"
        element={
          <ProtectedRoute role="admin">
            <GameManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/children"
        element={
          <ProtectedRoute role="admin">
            <ChildManagementPage />
          </ProtectedRoute>
        }
      />

      {/* Parent / Agent / Opérateur */}
      <Route
        path="/parent-dashboard"
        element={
          <ProtectedRoute role="parent">
            <ParentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent-dashboard"
        element={
          <ProtectedRoute role="agent">
            <AgentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/operator/play"
        element={
          <ProtectedRoute role="operator">
            <ScanAndPlayPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/operator-dashboard"
        element={
          <ProtectedRoute role="operator">
            <OperatorDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          user ? (
            <Navigate to={roleHome[user.role] || '/'} replace />
          ) : (
            <Navigate to="/" replace />   // ➜ non connecté → HomePage
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
