using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

List<Dog> dogs = new List<Dog>
{
    new Dog()
    {
        Id = 1,
        Name = "Coco",
        CityId = 1,
        WalkerId = 2
    },
    new Dog()
    {
        Id = 2,
        Name = "Naru",
        CityId = 1,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 3,
        Name = "Piper",
        CityId = 2,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 4,
        Name = "Remy",
        CityId = 3,
        WalkerId = 3
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

List<Walker> walkers = new List<Walker>
{
    new Walker()
    {
        Id = 1,
        Name = "Jackson"
    },
    new Walker()
    {
        Id = 2,
        Name = "JoNell"
    },
    new Walker()
    {
        Id = 3,
        Name = "Alex"
    }
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity()
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 2,
        WalkerId = 1,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 3,
        WalkerId = 1,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 4,
        WalkerId = 2,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 5,
        WalkerId = 2,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 6,
        WalkerId = 3,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 7,
        WalkerId = 3,
        CityId = 3
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

app.MapPost("/api/dogs", (Dog newDog) => 
{
    newDog.Id = dogs.Count > 0 ? dogs.Max(d => d.Id) + 1 : 1;
    dogs.Add(newDog);
    return newDog;
});

app.MapGet("/api/cities", () => 
{
    return cities;
});

app.MapGet("/api/cities/{id}", (int id) => 
{
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

app.MapGet("/api/walkers", () => 
{
    return walkers;
});

app.MapGet("/api/walkers/{cityName}", (string cityName) => 
{
    if (cityName != "0") 
    {
        City foundCity = cities.FirstOrDefault(c => c.Name == cityName);
        List<WalkerCity> filteredWalkerCities = walkerCities.Where(wc => wc.CityId == foundCity.Id).ToList();
        List<Walker> filteredWalkers = new List<Walker>();

        foreach (WalkerCity fwc in filteredWalkerCities)
        {
            Walker foundWalker = walkers.FirstOrDefault(w => w.Id == fwc.WalkerId);
            filteredWalkers.Add(foundWalker);
        }

        return Results.Ok(filteredWalkers);
    }
    else 
    {
        return Results.Ok(walkers);
    }
});

app.MapGet("/api/walker/{id}", (int id) => 
{
    Walker foundWalker = walkers.FirstOrDefault(fw => fw.Id == id);
    if (foundWalker == null)
    {
        return Results.Ok("Unassigned");
    }
    return Results.Ok(foundWalker);
});

app.Run();

