const BottomArea = ({ loading, fetchData, setCity }) => {

  const handleDeleteAll = () => {
    setCity([]);
  }

  return (
    <>
      <button type="button" className="btn btn btn-outline-dark" onClick={fetchData}>重新整理</button>
      <button type="button" className="btn btn btn-outline-dark margin-left" onClick={handleDeleteAll}>全部刪除</button>
      <div className="inline margin-left">
        {loading ?
          <div className="spinner-border text-dark" role="status"><span className="visually-hidden">Loading...</span></div> : `Done !`}
      </div>
    </>
  )
}

export default BottomArea;