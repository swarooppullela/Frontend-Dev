import { useState, useEffect, useCallback, useRef } from 'react';

const useFetch = (url, options = {}) => {
  const {
    method = 'GET',
    params = {},
    headers = {},
    body = null,
    retries = 2,
    retryDelay = 1000,
    enabled = true, // To control when to fetch
    onSuccess = null,
    onError = null
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef(null);

  // Build URL with query params
  const buildUrl = useCallback((baseUrl, queryParams) => {
    if (!queryParams || Object.keys(queryParams).length === 0) {
      return baseUrl;
    }
    
    const queryString = new URLSearchParams(queryParams).toString();
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}`;
  }, []);

  // Fetch with retry logic
  const fetchWithRetry = useCallback(async (fetchUrl, fetchOptions, maxRetries) => {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt + 1}/${maxRetries + 1} for ${fetchUrl}`);
        
        const response = await fetch(fetchUrl, fetchOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        let responseData;
        
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }
        
        return responseData;
        
      } catch (err) {
        lastError = err;
        
        // Don't retry if request was aborted
        if (err.name === 'AbortError') {
          throw err;
        }
        
        // Retry if attempts remaining
        if (attempt < maxRetries) {
          console.log(`Retry ${attempt + 1}/${maxRetries} after ${retryDelay}ms`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }
    
    throw lastError;
  }, [retryDelay]);

  // Main fetch function
  const executeFetch = useCallback(async () => {
    if (!url) return;
    
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = buildUrl(url, params);
      
      const fetchOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        signal: abortControllerRef.current.signal
      };
      
      if (body && method !== 'GET') {
        fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
      }
      
      const result = await fetchWithRetry(fullUrl, fetchOptions, retries);
      
      if (isMountedRef.current) {
        setData(result);
        setError(null);
        onSuccess?.(result);
      }
      
    } catch (err) {
      if (isMountedRef.current && err.name !== 'AbortError') {
        setError(err.message);
        setData(null);
        onError?.(err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [url, params, headers, body, method, retries, buildUrl, fetchWithRetry, onSuccess, onError]);

  // Auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (enabled) {
      executeFetch();
    }
    
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, executeFetch]);

  // Manual refetch function
  const refetch = useCallback(() => {
    return executeFetch();
  }, [executeFetch]);

  return {
    data,
    error,
    loading,
    refetch
  };
};

export default useFetch;


// ============ USAGE EXAMPLES ============

// Example 1: Basic GET request
function UserProfile() {
  const { data, error, loading } = useFetch('https://api.example.com/user/123', {
    retries: 2
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data?.name}</div>;
}

// Example 2: GET with query params
function SearchResults() {
  const { data, error, loading } = useFetch('https://api.example.com/search', {
    params: { q: 'react', limit: 10 },
    retries: 3,
    retryDelay: 2000
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

// Example 3: POST request with body
function CreatePost() {
  const { data, error, loading, refetch } = useFetch('https://api.example.com/posts', {
    method: 'POST',
    body: {
      title: 'New Post',
      content: 'Post content here'
    },
    headers: {
      'Authorization': 'Bearer token123'
    },
    retries: 2,
    enabled: false, // Don't auto-fetch
    onSuccess: (data) => console.log('Post created:', data),
    onError: (error) => console.error('Failed to create post:', error)
  });

  return (
    <div>
      <button onClick={refetch} disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
      {error && <p>Error: {error}</p>}
      {data && <p>Success! Post ID: {data.id}</p>}
    </div>
  );
}

// Example 4: Conditional fetching
function ConditionalFetch({ userId }) {
  const { data, error, loading } = useFetch(`https://api.example.com/user/${userId}`, {
    enabled: !!userId, // Only fetch if userId exists
    retries: 2
  });

  if (!userId) return <div>Please select a user</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data?.name}</div>;
}

// Example 5: Manual refetch with button
function RefetchExample() {
  const { data, error, loading, refetch } = useFetch('https://api.example.com/data', {
    retries: 3,
    retryDelay: 1500
  });

  return (
    <div>
      <button onClick={refetch} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}