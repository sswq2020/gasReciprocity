export const formDataTogasModel = data => {
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

export const gasModelToFormData = data => {
  const rData = {
    ...data,
    gasFeatureServiceIdList: data.gasFeatureServiceList.map(item => item.fsId),
    areaList: [
      {
        id: data.gsProvinceId,
        name: data.gsProvinceName,
      },
      {
        id: data.gsCityId,
        name: data.gsCityName,
      },
      {
        id: data.gsRegionId,
        name: data.gsRegionName,
      },
    ],
  };

  delete rData.gsProvinceId;
  delete rData.gsProvinceName;
  delete rData.gsCityId;
  delete rData.gsCityName;
  delete rData.gsRegionId;
  delete rData.gsRegionName;
  delete rData.gasFeatureServiceList;

  return rData;
};
