function RightSidePanelLayout({ children }) {
  return (
    <div className={`flex flex-col z-10 w-[350px] mr-[10px] px-4 py-3 pt-1`}>
      {children}

      <div>
        {/* dynamic 1  */}
        <div>
          {/* dynamic 2 */}
          {/* dynamic 3  */}
        </div>
      </div>
    </div>
  );
}

export default RightSidePanelLayout;
