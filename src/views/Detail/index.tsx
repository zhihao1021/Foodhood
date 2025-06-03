import { ReactNode, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Food from "@/schemas/food";
import getData from "@/api/getData";


export default function Detail(): ReactNode {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const all = await getData({ limit: 100 });
      const item = all.find((x) => x.id === id);
      setFood(item || null);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <p style={{ padding: "1rem" }}>載入中</p>;
  if (!food) return <p style={{ padding: "1rem" }}>找不到這筆便當資料</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{food.title}</h2>
      <p>{food.description}</p>
      <p>地點：{food.locationDescription}</p>
      <p>有效時間：{food.validityPeriod} 小時</p>
      <p>需要餐具：{food.needTableware ? "是" : "否"}</p>
      <p>是否素食：{food.includesVegetarian ? "是" : "否"}</p>

      <button>
        我要預訂
      </button>

      <br />
      <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
        返回上一頁
      </button>
    </div>
  );
}
