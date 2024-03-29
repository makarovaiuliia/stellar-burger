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
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>

    <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal title='hello' children={<FeedInfo />} onClose={() => {}} />
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title='Детали ингредиента'
            children={<IngredientDetails />}
            onClose={() => {}}
          />
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title='hello' children={<OrderInfo />} onClose={() => {}} />
        }
      />
    </Routes>
  </div>
);

export default App;
