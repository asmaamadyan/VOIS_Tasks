import authReducer, { authActions } from "./auth";

describe("auth slice", () => {
  test("should return the initial state", () => {
    const initialState = { isAuthenticated: false };
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("should handle login", () => {
    const previousState = { isAuthenticated: false };
    expect(authReducer(previousState, authActions.login())).toEqual({
      isAuthenticated: true,
    });
  });

  test("should handle logout", () => {
    const previousState = { isAuthenticated: true };
    expect(authReducer(previousState, authActions.logout())).toEqual({
      isAuthenticated: false,
    });
  });
});