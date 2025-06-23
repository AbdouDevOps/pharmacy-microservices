package com.gestion_de_stock.gestion_de_stock.mapper;

import com.gestion_de_stock.gestion_de_stock.DTO.MedicamentDTO;
import com.gestion_de_stock.gestion_de_stock.model.Medicament;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MedicamentMapper {

    // Champs du fournisseur
    @Mapping(source = "fournisseur.name", target = "fournisseurName")
    @Mapping(source = "fournisseur.phone", target = "fournisseurPhone")
    @Mapping(source = "fournisseur.fax", target = "fournisseurFax")
    @Mapping(source = "fournisseur.address", target = "fournisseurAddress")
    @Mapping(source = "fournisseur.website", target = "fournisseurWebsite")
    @Mapping(source = "fournisseur.status", target = "fournisseurStatus")

    MedicamentDTO toDTO(Medicament medicament);

    List<Medicament> toDTO(List<Medicament> medicament);
}
