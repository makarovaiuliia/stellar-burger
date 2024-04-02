import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  FeedInfo,
  IngredientDetails,
  Modal,
  OrderInfo
} from '@components';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../../utils/protectedRoute';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Заказ'
              children={<OrderInfo />}
              onClose={() => navigate('/feed')}
            />
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              children={<IngredientDetails />}
              onClose={() => navigate('/')}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='Заказ'
              children={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
              onClose={() => navigate('/profile/orders')}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
