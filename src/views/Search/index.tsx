import { useState } from "react";
import { Food } from "@/schemas/food";
// import getData from "@/api/getData";
import styles from "./index.module.scss";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results,] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // const allData = await getData({ limit: 100 });
    // const filtered = allData.filter(item =>
    //   item.title.includes(query) || item.description.includes(query)
    // );
    // setResults(filtered);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>搜尋便當</h2>
      <div className={styles["search-bar"]}>
        <input
          type="text"
          value={query}
          placeholder="輸入關鍵字"
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>搜尋</button>
      </div>

      {loading && <p className={styles.loading}>載入中...</p>}

      <ul>
        {results.map((item) => (
          <li key={item.uid}>
            {item.title} - {item.locationDescription}
          </li>
        ))}
      </ul>

      {results.length === 0 && !loading && (
        <p className={styles["no-result"]}>找不到符合的資料</p>
      )}
    </div>
  );
}
