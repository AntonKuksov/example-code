import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function BrandInfo() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const brandId = searchParams.get("id");
    if (brandId) {
      navigate(`/products?brands=${brandId}`);
    }
  }, [searchParams, navigate]);

  return null;
}
