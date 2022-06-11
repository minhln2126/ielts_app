import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HomePage } from "./pages/Home";
import { TestPage } from "./pages/Test";
import { PostPage } from "./pages/Post";
import { ForumPage } from "./pages/Forum";
import { AdminPage } from "./pages/Admin";
import { Popup } from "./components/Popup";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ToeicInfoPage } from "./pages/ToeicInfo";
import { ListTestsPage } from "./pages/ListTests";
import "./App.css";
const queryClient = new QueryClient();
function App() {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path="/de-thi" component={ListTestsPage} />
            <Route path="/kiem-tra/:id" component={TestPage} />
            <Route path="/thong-tin" component={ToeicInfoPage} />
            <Route path="/quan-ly" component={AdminPage} />
            <Route path="/forum" component={ForumPage} />
            <Route path="/bai-viet/:id" component={PostPage} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </QueryClientProvider>
      </BrowserRouter>
      <Popup />
      <Footer />
    </React.Fragment>
  );
}

export default App;
