import Navbar from "../navbar/navbar";

const ProtectedLayout = ({ children }) => (
  <>
    <Navbar />
    <div style={{ height: `calc(100vh - 60px)` }}>{children}</div>
  </>
);

export default ProtectedLayout;