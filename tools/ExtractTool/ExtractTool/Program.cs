using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using Newtonsoft.Json;

namespace ExtractTool
{
    class Program
    {
        static async Task Main()
        {
            var serviceProvider = BuildServiceProvider();

            var sportsAPIClient = serviceProvider.GetRequiredService<SportsAPIClient>();

            // Get a single sport
            var sport = await sportsAPIClient.Get(404);

            // Get a sport recommandations
            var sportRecommandations = await sportsAPIClient.GetRecommendations(404);

            // Get all sports
            var allSports = await sportsAPIClient.GetAll();
            var parentSports = allSports.Where(s => s.IsParent).ToList();

            // Write to JSON file
            WriteToFile("parentSports", parentSports);

            parentSports.ForEach(ps => Console.WriteLine(ps.Attributes.Name));
            Console.WriteLine("All done. Press any key to close this window...");
            Console.Read();

        }

        static ServiceProvider BuildServiceProvider()
        {
            var services = new ServiceCollection();
            services.AddHttpClient<SportsAPIClient>();

            return services.BuildServiceProvider();
        }

        static void WriteToFile(string fileName, object value)
        {
            using (StreamWriter file = File.CreateText($"{fileName}.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, value);
            }
        }
    }
}
