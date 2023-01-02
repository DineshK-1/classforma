import { Route, Routes } from 'react-router-dom';
import Home from './Routes/Home/Home.component';
import Viewer from './Routes/PDFViewer/PdfViewer.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/PDFViewer" element={<Viewer />} />
    </Routes>
  );
}

export default App;
