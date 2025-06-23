package com.gestion_de_stock.gestion_de_stock.mapper;

import com.gestion_de_stock.gestion_de_stock.DTO.AddMedicamentLotRequest;
import com.gestion_de_stock.gestion_de_stock.model.Lots;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LotMapper {

    @Mapping(target = "id", ignore = true) // généré dans le service
    @Mapping(target = "lotNumber", expression = "java(\"lot_\" + request.getName().toLowerCase())")
    @Mapping(target = "medicamentId", ignore = true) // à définir dans le service
    Lots toEntity(AddMedicamentLotRequest request);
}
