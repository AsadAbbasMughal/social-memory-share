const showMemoriesData = async () => {
  try {
    const { data, error } = await supabase.from("countries").select();
    if (error) throw error;
    if (data) {
      console.log(data);
    }
  } catch (error) {
    console.log(error)
  }
};

// window.onload = showMemoriesData();
