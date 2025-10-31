import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UserList from './components/users/UserList';
import EleveList from './components/eleves/EleveList';
import ClasseList from './components/classes/ClasseList';
import CoursList from './components/cours/CoursList';
import NoteList from './components/notes/NoteList';
import PaiementList from './components/paiements/PaiementList';
import CommunicationList from './components/communications/CommunicationList';
import ParentEleveList from './components/parents/ParentEleveList';
import BulletinList from './components/bulletins/BulletinList';
import DetailBulletinList from './components/detail-bulletins/DetailBulletinList';
import AdresseEleveList from './components/adresses/AdresseEleveList';
import StatusCheck from './components/StatusCheck';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/eleves" element={<EleveList />} />
              <Route path="/classes" element={<ClasseList />} />
              <Route path="/cours" element={<CoursList />} />
              <Route path="/notes" element={<NoteList />} />
              <Route path="/paiements" element={<PaiementList />} />
              <Route path="/communications" element={<CommunicationList />} />
              <Route path="/parent-eleve" element={<ParentEleveList />} />
              <Route path="/bulletins" element={<BulletinList />} />
              <Route path="/detail-bulletins" element={<DetailBulletinList />} />
              <Route path="/adresses-eleves" element={<AdresseEleveList />} />
              <Route path="/status" element={<StatusCheck />} />
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
