import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { VideosPage } from './pages/VideosPage';
import { VideoSuggestionsPage } from './pages/VideoSuggestionsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { SearchPage } from './pages/SearchPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { GiveawaysPage } from './pages/GiveawaysPage';
import { CommunityPage } from './pages/CommunityPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PollsPage } from './pages/PollsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { LoginPage } from './pages/admin/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { BlogListPage } from './pages/admin/BlogListPage';
import { BlogEditorPage } from './pages/admin/BlogEditorPage';
import { VideoSuggestionsAdminPage } from './pages/admin/VideoSuggestionsAdminPage';
import { GiveawaysAdminPage } from './pages/admin/GiveawaysAdminPage';
import { CommunityAdminPage } from './pages/admin/CommunityAdminPage';
import { AnnouncementsAdminPage } from './pages/admin/AnnouncementsAdminPage';
import { ProjectsAdminPage } from './pages/admin/ProjectsAdminPage';
import { PollsAdminPage } from './pages/admin/PollsAdminPage';
import { NewsletterAdminPage } from './pages/admin/NewsletterAdminPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Zap, ArrowLeft, Search } from 'lucide-react';

export function Router() {
  const [path, setPath] = useState(window.location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setPath(window.location.pathname);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isAdminPage = path.startsWith('/admin');
  const showLayout = !path.includes('/admin/login');

  let content = null;

  if (path === '/' || path === '') {
    content = <HomePage />;
  } else if (path === '/videos') {
    content = <VideosPage />;
  } else if (path === '/video-fikirleri') {
    content = <VideoSuggestionsPage />;
  } else if (path === '/blog') {
    content = <BlogPage />;
  } else if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    content = <BlogDetailPage slug={slug} />;
  } else if (path === '/ara' || path.startsWith('/ara?')) {
    content = <SearchPage />;
  } else if (path === '/istatistikler') {
    content = <AnalyticsPage />;
  } else if (path === '/kategoriler') {
    content = <CategoriesPage />;
  } else if (path === '/cekilisler') {
    content = <GiveawaysPage />;
  } else if (path === '/topluluk') {
    content = <CommunityPage />;
  } else if (path === '/projeler') {
    content = <ProjectsPage />;
  } else if (path === '/anketler') {
    content = <PollsPage />;
  } else if (path === '/duyurular') {
    content = <AnnouncementsPage />;
  } else if (path === '/hakkimizda') {
    content = <AboutPage />;
  } else if (path === '/admin/login') {
    content = <LoginPage />;
  } else if (path === '/admin') {
    content = <AdminDashboard />;
  } else if (path === '/admin/blog') {
    content = <BlogListPage />;
  } else if (path === '/admin/blog/new') {
    content = <BlogEditorPage />;
  } else if (path.startsWith('/admin/blog/')) {
    const postId = path.replace('/admin/blog/', '');
    content = <BlogEditorPage postId={postId} />;
  } else if (path === '/admin/video-suggestions') {
    content = <VideoSuggestionsAdminPage />;
  } else if (path === '/admin/cekilisler') {
    content = <GiveawaysAdminPage />;
  } else if (path === '/admin/community') {
    content = <CommunityAdminPage />;
  } else if (path === '/admin/announcements') {
    content = <AnnouncementsAdminPage />;
  } else if (path === '/admin/projects') {
    content = <ProjectsAdminPage />;
  } else if (path === '/admin/polls') {
    content = <PollsAdminPage />;
  } else if (path === '/admin/newsletter') {
    content = <NewsletterAdminPage />;
  } else if (path === '/admin/settings') {
    content = <SettingsPage />;
  } else {
    content = (
      <div className="min-h-screen flex items-center justify-center page-enter">
        <div className="text-center space-y-6">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 w-32 h-32 rounded-full bg-green-500/20 blur-3xl animate-pulse" />
            <div className="relative w-28 h-28 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center">
              <Zap className="w-12 h-12 text-green-400 animate-float" />
            </div>
          </div>
          <div>
            <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-3">404</h1>
            <p className="text-xl text-zinc-300 font-semibold mb-1">Sayfa bulunamadı</p>
            <p className="text-sm text-zinc-500">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-zinc-950 rounded-xl hover:bg-green-400 transition-all duration-300 font-bold shadow-lg shadow-green-500/30 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5" />
              Ana Sayfaya Dön
            </a>
            <a
              href="/ara"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-zinc-200 rounded-xl hover:bg-white/5 transition-all duration-300 font-semibold hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              Ara
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showLayout && <Navbar />}
      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {content}
      </div>
      {showLayout && !isAdminPage && <Footer />}
    </>
  );
}
