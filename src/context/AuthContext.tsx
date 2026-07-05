/*
|--------------------------------------------------------------------------
| AuthContext.tsx
|--------------------------------------------------------------------------
| Chức năng:
| Đây là file quản lý trạng thái đăng nhập (Authentication) của toàn bộ ứng dụng.
|
| File này sử dụng React Context để lưu thông tin người dùng sau khi đăng nhập,
| đồng thời sử dụng AsyncStorage để lưu dữ liệu xuống bộ nhớ điện thoại.
|
| Khi ứng dụng được mở:
| 1. Kiểm tra xem người dùng đã đăng nhập trước đó chưa.
| 2. Nếu có Token và User trong AsyncStorage thì tự động đăng nhập.
| 3. Nếu không có thì chuyển đến màn hình Login.
|
| Khi đăng nhập:
| - Lưu Token.
| - Lưu thông tin User.
| - Cập nhật trạng thái đăng nhập cho toàn bộ ứng dụng.
|
| Khi đăng xuất:
| - Xóa Token.
| - Xóa User.
| - Cập nhật trạng thái về chưa đăng nhập.
|
| Nhờ Context nên mọi màn hình (Home, Profile, Cart, Order,...)
| đều có thể biết người dùng hiện tại là ai mà không cần truyền dữ liệu
| qua nhiều Component.
|--------------------------------------------------------------------------
*/

import React, { createContext, useContext, useState, useEffect } from 'react';

// AsyncStorage dùng để lưu dữ liệu cục bộ trên điện thoại.
// Giống LocalStorage của trình duyệt.
import AsyncStorage from '@react-native-async-storage/async-storage';

/*-------------------------------------------------------------------------
| Định nghĩa kiểu dữ liệu của User.
| Đây là thông tin Backend trả về sau khi đăng nhập thành công.
|--------------------------------------------------------------------------
*/
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

/*-------------------------------------------------------------------------
| Định nghĩa dữ liệu mà AuthContext sẽ quản lý.
|
| Bao gồm:
| - user      : thông tin người dùng hiện tại
| - token     : JWT Token
| - loading   : trạng thái đang kiểm tra đăng nhập
| - login()   : hàm đăng nhập
| - logout()  : hàm đăng xuất
|--------------------------------------------------------------------------
*/
type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

/*-------------------------------------------------------------------------
| Tạo Context dùng chung cho toàn bộ ứng dụng.
|
| Context giống như một "kho dữ liệu chung".
|
| Thay vì truyền dữ liệu từ App -> Home -> Profile -> Cart...
| thì mọi màn hình đều có thể lấy trực tiếp từ Context.
|--------------------------------------------------------------------------
*/
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

/*-------------------------------------------------------------------------
| AuthProvider
|
| Đây là Component bao toàn bộ App.
|
| Ví dụ trong App.tsx:
|
| <AuthProvider>
|      <Navigation />
| </AuthProvider>
|
| Khi đó toàn bộ màn hình trong ứng dụng đều có thể sử dụng:
|
| useAuth()
|--------------------------------------------------------------------------
*/
export function AuthProvider({ children }: { children: React.ReactNode }) {

  /*-----------------------------------------------------------------------
  | user
  | Lưu thông tin người dùng hiện tại.
  |
  | Ban đầu:
  | user = null
  |
  | Sau khi đăng nhập:
  | user = {
  |    id,
  |    name,
  |    email,
  |    role
  | }
  -----------------------------------------------------------------------*/
  const [user, setUser] = useState<User | null>(null);

  /*-----------------------------------------------------------------------
  | token
  |
  | Lưu JWT Token nhận từ Backend.
  |
  | Token sẽ được dùng khi gọi các API cần xác thực.
  -----------------------------------------------------------------------*/
  const [token, setToken] = useState<string | null>(null);

  /*-----------------------------------------------------------------------
  | loading
  |
  | loading = true
  | => App đang kiểm tra xem người dùng đã đăng nhập chưa.
  |
  | loading = false
  | => Kiểm tra xong.
  -----------------------------------------------------------------------*/
  const [loading, setLoading] = useState(true);

  /*-----------------------------------------------------------------------
  | useEffect()
  |
  | Chỉ chạy đúng 1 lần khi mở App.
  |
  | Nhiệm vụ:
  | Kiểm tra xem điện thoại đã lưu Token và User hay chưa.
  |
  | Nếu có:
  | -> Tự động đăng nhập.
  |
  | Nếu không:
  | -> Hiển thị màn hình Login.
  -----------------------------------------------------------------------*/
  useEffect(() => {

    const loadStoredAuth = async () => {
      try {

        // Đọc Token đã lưu trên điện thoại
        const storedToken = await AsyncStorage.getItem('token');

        // Đọc thông tin User đã lưu
        const storedUser = await AsyncStorage.getItem('user');

        // Nếu tồn tại Token và User
        if (storedToken && storedUser) {

          // Cập nhật State
          setToken(storedToken);

          // Chuyển chuỗi JSON thành Object
          setUser(JSON.parse(storedUser));
        }

      } catch (error) {

        console.log('Lỗi đọc AsyncStorage:', error);

      } finally {

        // Đánh dấu đã kiểm tra xong
        setLoading(false);
      }
    };

    loadStoredAuth();

  }, []);

  /*-----------------------------------------------------------------------
  | login()
  |
  | Được gọi sau khi Backend trả về:
  |
  | {
  |    token,
  |    user
  | }
  |
  | Chức năng:
  | 1. Lưu Token xuống AsyncStorage.
  | 2. Lưu User xuống AsyncStorage.
  | 3. Cập nhật State của React.
  |
  | Sau khi hàm này chạy xong:
  | Toàn bộ App biết người dùng đã đăng nhập.
  -----------------------------------------------------------------------*/
  const login = async (userData: User, userToken: string) => {

    await AsyncStorage.setItem('token', userToken);

    await AsyncStorage.setItem('user', JSON.stringify(userData));

    setToken(userToken);

    setUser(userData);
  };

  /*-----------------------------------------------------------------------
  | logout()
  |
  | Chức năng:
  | 1. Xóa Token khỏi điện thoại.
  | 2. Xóa User khỏi điện thoại.
  | 3. Đưa trạng thái App về chưa đăng nhập.
  |
  | Sau khi logout:
  | user = null
  | token = null
  -----------------------------------------------------------------------*/
  const logout = async () => {

    await AsyncStorage.removeItem('token');

    await AsyncStorage.removeItem('user');

    setToken(null);

    setUser(null);
  };

  /*-----------------------------------------------------------------------
  | Provider
  |
  | Cung cấp dữ liệu cho toàn bộ ứng dụng.
  |
  | Mọi màn hình đều có thể lấy:
  |
  | const { user, token, login, logout } = useAuth();
  |
  -----------------------------------------------------------------------*/
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*-------------------------------------------------------------------------
| Custom Hook
|
| Thay vì phải viết:
|
| const auth = useContext(AuthContext);
|
| Chỉ cần:
|
| const { user, token, login, logout } = useAuth();
|
| Code sẽ ngắn gọn và dễ đọc hơn.
|--------------------------------------------------------------------------
*/
export const useAuth = () => useContext(AuthContext);