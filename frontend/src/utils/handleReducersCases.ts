

// Helper function to handle async state changes
const handleAsyncCases = (builder: any, asyncThunk: any, onFulfilled?: (state: any, action: any) => void) => {
  builder
    .addCase(asyncThunk.pending, (state:any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state:any, action:any) => {
      state.loading = false;
      if (onFulfilled) {
        onFulfilled(state, action);
      }
    })
    .addCase(asyncThunk.rejected, (state:any, action:any) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

