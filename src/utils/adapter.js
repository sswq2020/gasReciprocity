export const gasFormAdapter = data => {
  const rData = {
    ...data,
    gsProvinceId: data.areaList[0].id,
    gsProvinceName: data.areaList[0].name,
    gsCityId: data.areaList[1].id,
    gsCityName: data.areaList[1].name,
    gsRegionId: data.areaList[2].id,
    gsRegionName: data.areaList[2].name,
  };
  delete rData.areaList;
  return rData;
};
