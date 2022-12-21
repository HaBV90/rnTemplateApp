// A helper type to enable us to strongly type nested
// screens.
export type ScreenType<ParamList, ParamListKey extends keyof ParamList> = {
  screen: ParamListKey;

  // This could be made to be optional, however we lose the type safety
  // on screens that do indeed have params. So we are keeping this required
  // but it is nullable so you can just set it to undefined
  params: ParamList[ParamListKey];
};

export type ParamScreens<ScreenParamList, OwnParams = {}> = {
  [T in keyof ScreenParamList]: ScreenType<ScreenParamList, T> & OwnParams;
};

/**
 * This function takes your params list for your stack / tab
 * navigatior, and converts it so that you can use it to
 * strongly type nested screen paramaters.
 */
export type ConvertParamsIntoScreenTypes<
  ScreenParamList, // Param list as per https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
  OwnParams = {}, // Any extra params that this route should include
> = ParamScreens<
  ScreenParamList,
  OwnParams
>[keyof ParamScreens<ScreenParamList>];
