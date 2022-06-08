using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Nathan_DMS_System.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nathan_DMS_System.Data.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Dealer, NewDealerView>()
                .ReverseMap();

            CreateMap<Specification, AddEditVehicle>()
                .ReverseMap();

            CreateMap<Dealer, LoginViewModel>()
                .ReverseMap();

            CreateMap<Prospect, CreateProspectViewModel>()
               .ReverseMap();

            CreateMap<Prospect, ProspectDisplay>()
                .ForMember(m => m.make, o => o.MapFrom (s=>s.vehicle.Specification.make))
                .ForMember(m => m.model, o => o.MapFrom(s => s.vehicle.Specification.model))
                .ForMember(m => m.model_built_year, o => o.MapFrom(s => s.vehicle.Specification.model_built_year))
               .ReverseMap();

            CreateMap<Vehicle, EditVehicleDTO>()
                .ForMember(m => m.make, o => o.MapFrom(s => s.Specification.make))
                .ForMember(m => m.model, o => o.MapFrom(s => s.Specification.model))
                .ForMember(m => m.model_built_year, o => o.MapFrom(s => s.Specification.model_built_year))
                .ForMember(m => m.body_type, o => o.MapFrom(s => s.Specification.body_type))
                .ForMember(m => m.odometer, o => o.MapFrom(s => s.Specification.odometer))
                .ForMember(m => m.registration_number, o => o.MapFrom(s => s.Specification.registration_number))
                .ForMember(m => m.doors, o => o.MapFrom(s => s.Specification.doors))
                .ForMember(m => m.transmission, o => o.MapFrom(s => s.Specification.transmission))
                .ForMember(m => m.seats, o => o.MapFrom(s => s.Specification.seats))
                .ForMember(m => m.fuel, o => o.MapFrom(s => s.Specification.fuel))
                .ForMember(m => m.dap_price, o => o.MapFrom(s => s.Specification.dap_price))
                .ForMember(m => m.egc_price, o => o.MapFrom(s => s.Specification.egc_price))

               .ReverseMap();

            CreateMap<Vehicle, AllVehiclesViewModel>()
             .ForMember(m=> m.make, o=> o.MapFrom(s=> s.Specification.make))
             .ForMember(m => m.model, o => o.MapFrom(s => s.Specification.model))
             .ForMember(m => m.model_built_year, o => o.MapFrom(s => s.Specification.model_built_year))
             .ForMember(m => m.odometer, o => o.MapFrom(s => s.Specification.odometer))
              .ForMember(m => m.egc_price, o => o.MapFrom(s => s.Specification.egc_price))
             .ReverseMap();

            CreateMap<JsonPatchDocument<AllVehiclesViewModel>, Vehicle>()
                .ReverseMap();
            CreateMap<Operation<AllVehiclesViewModel>, Operation<Vehicle>>()
                .ReverseMap();

            CreateMap<Vehicle, MainScreenAllVehiclesPublished>()
                          .ForMember(m => m.make, o => o.MapFrom(s => s.Specification.make))
                          .ForMember(m => m.model, o => o.MapFrom(s => s.Specification.model))
                          .ForMember(m => m.model_built_year, o => o.MapFrom(s => s.Specification.model_built_year))
                          .ForMember(m => m.body_type, o => o.MapFrom(s => s.Specification.body_type))
                          .ForMember(m => m.odometer, o => o.MapFrom(s => s.Specification.odometer))
                          .ForMember(m => m.registration_number, o => o.MapFrom(s => s.Specification.registration_number))
                          .ForMember(m => m.doors, o => o.MapFrom(s => s.Specification.doors))
                          .ForMember(m => m.transmission, o => o.MapFrom(s => s.Specification.transmission))
                          .ForMember(m => m.seats, o => o.MapFrom(s => s.Specification.seats))
                          .ForMember(m => m.fuel, o => o.MapFrom(s => s.Specification.fuel))
                          .ForMember(m => m.egc_price, o => o.MapFrom(s => s.Specification.egc_price))

                         .ReverseMap();

        }
    }
}

/*.ForMember(c => c.prospects, option => option.Ignore())
            .ForMember(c => c.dealer, option => option.Ignore())
            .ForMember(c => c.tag, option => option.Ignore())*/