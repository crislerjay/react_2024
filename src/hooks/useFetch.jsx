import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const json = await res.json()

        setIsLoading(false)
        setData(json)
        setError(null)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('the fetch was aborted');
        } else {
          setIsLoading(false)
          setError('Could not fetch data')
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return { data, isLoading, error }
}
