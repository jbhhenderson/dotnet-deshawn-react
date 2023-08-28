using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

List<Dog> dogs = new List<Dog>
{
    new Dog()
    {
        Id = 1,
        Name = "Coco",
        CityId = 1
    },
    new Dog()
    {
        Id = 2,
        Name = "Naru",
        CityId = 1
    },
    new Dog()
    {
        Id = 3,
        Name = "Piper",
        CityId = 2
    }
};

List<City> cities = new List<City>
{
    new City()
    {
        Id = 1,
        Name = "Clarkson"
    },
    new City()
    {
        Id = 2,
        Name = "Bowling Green"
    },
    new City()
    {
        Id = 3,
        Name = "Nashville"
    }
};

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () => 
{
    return dogs;
});

app.MapGet("/api/cities", () => 
{
    return cities;
});

app.MapGet("/api/cities/{id}", (int id) => {
    City foundCity = cities.FirstOrDefault(fc => fc.Id == id);
    if (foundCity == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(foundCity);
});

app.MapPost("/api/cities", (City city) => 
{
    city.Id = cities.Count > 0 ? cities.Max(c => c.Id) + 1 : 1;
    cities.Add(city);
    return city;
});

app.Run();
