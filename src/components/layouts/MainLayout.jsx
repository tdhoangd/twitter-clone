function MainLayout({ children }) {
  return (
    <main
      className={`w-full !max-w-[600px] md:w-[600px] 2md:w-[920px] 2lg:w-[990px] bg-th-background-secondary h-screen`}
    >
      <div>
        <div>Main container layout</div>
        {children}
      </div>
    </main>
  );
}

export default MainLayout;
